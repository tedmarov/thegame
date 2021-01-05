import React, { useContext, useEffect, useState } from "react"
import { EventContext } from "./EventProvider.js"
import { GameContext } from "../games/GameProvider.js"
import { TypeContext } from "../games/TypeProvider.js"


export const EventForm = (props) => {
    const { events, addEvent, updateEvent, getEvents, deleteEvent } = useContext(EventContext)
    const { games, getGames } = useContext(GameContext)
    const { types, getTypes } = useContext(TypeContext)

    // Component state
    const [event, setEvent] = useState(
        {
            isActive: true,
            typeId: "0"
        })

    // Something of a URL parameter
    const editMode = props.match.params.hasOwnProperty("eventId")

    const handleControlledInputChange = (e) => {
        /*
            When changing a state object or array, always create a new one
            and change state instead of modifying current one
        */
        const newEvent = Object.assign({}, event)
        newEvent[e.target.name] = e.target.value
        setEvent(newEvent)
    }

    /*
        If there is a URL parameter, then the user has chosen to
        edit an event.
            1. Get the value of the URL parameter.
            2. Use that `id` to find the animal.
            3. Update component state variable.
    */

    const getEventInEditMode = () => {
        if (editMode) {
            const eventId = parseInt(props.match.params.eventId)
            const selectedEvent = events.find(e => e.id === eventId) || {}
            setEvent(selectedEvent)
        }
    }

    const handleCheckedInputChange = (e) => {
        const cancelledEvent = Object.assign({}, event)
        cancelledEvent[e.target.name] = Boolean(e.target.checked)
        setEvent(cancelledEvent)
    }
    /*
        Get events, types, games state on initialization.
    */
    useEffect(() => {
        getEvents()
        getTypes()
        getGames()
    }, [])

    /* Once provider state is updated, determine the event, if edited */

    useEffect(() => {
        getEventInEditMode()
    }, [events])

    const constructNewEvent = () => {


        /*
            The `location` and `products` variables below are
            the  attached to the input fields. You
            can't just ask for the `.value` property directly,
            but rather `.current.value` now in React.
        */


        // const typeId = parseInt(type.current.value)
        // const gameId = parseInt(game.current.value)
        // const eventName = name.current.value
        // const eventHostId = parseInt(localStorage.getItem("game_player"))
        // const eventLoc = location.current.value
        // const eventDateAndTime = when.current.value
        // const details = description.current.value
        const typeId = parseInt(event.typeId)
        const gameId = parseInt(event.gameId)

        if (typeId === 0 || gameId === 0) {
            window.alert("Please select a type or game")
        } else {
            if (editMode) {
                updateEvent({
                    isActive: event.isActive,
                    typeId: typeId,
                    gameId: gameId,
                    eventName: event.eventName,
                    eventHostId: parseInt(localStorage.getItem("game_player")),
                    eventLoc: event.eventLoc,
                    eventDateAndTime: event.eventDateAndTime,
                    details: event.details,
                    id: event.id,
                })
                    .then(() => props.history.push("/events"))
            } else {
                addEvent({
                    isActive: event.isActive,
                    typeId: typeId,
                    gameId: gameId,
                    eventName: event.eventName,
                    eventHostId: parseInt(localStorage.getItem("game_player")),
                    eventLoc: event.eventLoc,
                    eventDateAndTime: event.eventDateAndTime,
                    details: event.details
                })
                    .then(() => props.history.push("/events"))
            }
        }
    }

    return (
        <main className="container--main">
            <section>
                <form className="form--main">
                    <fieldset>
                        <h2>{editMode ? "Update Event" : "New Event"}</h2>
                    </fieldset>
                    <fieldset>
                        {editMode && <div className="form-Control">Is the event still on?:
                        <input
                                name="isActive"
                                type="checkbox"
                                checked={event.isActive}
                                onChange={handleCheckedInputChange} /> </div>}
                        <label htmlFor="typeId"> Select Game Type </label>
                        <select name="typeId" className="form-control"
                            prototype="int"
                            required
                            value={event.typeId}
                            onChange={handleControlledInputChange}>
                            <option value="0">Select type</option>
                            {types.map(t => (
                                <option key={t.id} value={t.id} >
                                    {t.category}
                                </option>
                            ))}
                        </select>
                    </fieldset>
                    <fieldset>
                        <label htmlFor="gameId"> Select Game </label>
                        <select name="gameId"
                            className="form-control"
                            prototype="int"
                            required
                            value={event.gameId}
                            onChange={handleControlledInputChange}>
                            <option value="0">Select game</option>
                            {games.map(g => (
                                <option key={g.id} value={g.id} >
                                    {g.title}
                                </option>
                            ))}
                        </select>
                    </fieldset>
                    <fieldset>
                        <label htmlFor="eventName">Event name: </label>
                        <input type="text" name="eventName"
                            required autoFocus
                            className="form-control"
                            placeholder="Event name"
                            value={event.eventName}
                            onChange={handleControlledInputChange} />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="eventLoc">Event location: </label>
                        <input type="text" name="eventLoc"
                            required autoFocus
                            className="form-control"
                            placeholder="Location name"
                            value={event.eventLoc}
                            onChange={handleControlledInputChange} />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="eventDateAndTime">Event Date and Time: </label>
                        <input type="text" name="eventDateAndTime"
                            required autoFocus
                            className="form-control"
                            placeholder="Event date and time"
                            value={event.eventDateAndTime}
                            onChange={handleControlledInputChange} />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="details"> Short Description </label>
                        <textarea type="text" rows="3" cols="20"
                            name="details"
                            className="form-control"
                            placeholder="Enter description"
                            value={event.details}
                            required onChange={handleControlledInputChange} />
                    </fieldset>
                </form>
                <fieldset>
                    <button type="submit"
                        onClick={evt => {
                            evt.preventDefault() // Prevent browser from submitting the form
                            constructNewEvent()
                        }}>
                        {editMode ? "Update Event" : "Create Event"}
                    </button>
                </fieldset>
                {editMode && <fieldset>
                    <button
                        onClick={() => {
                            deleteEvent(event.id)
                                .then(() => {
                                    props.history.push("/events")
                                })
                        }}>Delete Event</button>
                </fieldset>}
            </section>
        </main>
    )
}
// Console log the checkboxes for values