import React, { useContext, useRef, useEffect, useState } from "react"
import { EventContext } from "./EventProvider.js"
import { GameContext } from "../games/GameProvider.js"
import { TypeContext } from "../games/TypeProvider.js"
import "./Event.css"

export const EventForm = (props) => {
    const { events, addEvent, updateEvent } = useContext(EventContext)
    const { games, getGames } = useContext(GameContext)
    const { types, getTypes } = useContext(TypeContext)

    // Component state
    const [event, setEvent] = useState({})

    // Something of a URL parameter
    const editMode = props.match.params.hasOwnProperty("eventId")

    const handleControlledInputChange = (event) => {
        /*
            When changing a state object or array, always create a new one
            and change state instead of modifying current one
        */
        const newEvent = Object.assign({}, event)
        newEvent[event.target.name] = event.target.value
        setEvent(newEvent)
    }

    /*
        If there is a URL parameter, then the user has chosen to
        edit an animal.
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

    /*
    Create references that can be attached to the input
    fields in the form. This will allow you to get the
    value of the input fields later when the user clicks
    the button.
    
    Doesn't have `document.querySelector()` in React.
    */

    const type = useRef(null)
    const game = useRef(null)
    const name = useRef(null)
    const when = useRef(null)
    const location = useRef(null)
    const description = useRef(null)
    const isCancelled = useRef(null)

    /*
        Get Products state and location state on initialization.
    */
    useEffect(() => {
        getTypes().then(getGames)
    }, [])

    const constructNewEvent = () => {


        /*
            The `location` and `products` variables below are
            the references attached to the input fields. You
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
                    isCancelled: Boolean(isCancelled.current.checked),
                    typeId: event.typeId,
                    gameId: event.gameId,
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
                    typeId: event.typeId,
                    gameId: event.gameId,
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
        <form className="eventForm">
            <h2 className="eventForm__title">New Event</h2>
            <fieldset>
                <div className="form-group">
                    <input type="checkbox" ref={isCancelled} onChange={handleControlledInputChange}></input>
                    <label htmlFor="status">Do you need to cancel?</label>
                    <label htmlFor="type"> Select Game Type </label>
                    <select defaultValue="" name="type" ref={type} id="GameType" className="form-control" >
                        <option value="0">Select type</option>
                        {types.map(t => (
                            <option key={t.id} value={t.id} onChange={handleControlledInputChange}>
                                {t.category}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="game"> Select Game </label>
                    <select defaultValue="" name="game" ref={game} id="GameName" className="form-control" >
                        <option value="0">Select game</option>
                        {games.map(g => (
                            <option key={g.id} value={g.id} onChange={handleControlledInputChange}>
                                {g.title}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="eventName">Event name: </label>
                    <input type="text" id="eventName" ref={name}
                        required autoFocus
                        className="form-control"
                        placeholder="Event name"
                        onChange={handleControlledInputChange} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="eventLoc">Event location: </label>
                    <input type="text" id="eventLoc" ref={location}
                        required autoFocus
                        className="form-control"
                        placeholder="Location name"
                        onChange={handleControlledInputChange} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="eventDateAndTime">Event Date and Time: </label>
                    <input type="text" id="eventDateAndTime" ref={when}
                        required autoFocus
                        className="form-control"
                        placeholder="Event date and time"
                        onChange={handleControlledInputChange} />
                </div>
            </fieldset>
            <fieldset>
                <label htmlFor="detail"> Short Description </label>
                <textarea ref={description} type="text" rows="3" cols="20"
                    name="detail"
                    className="form-control"
                    placeholder="Enter description"
                    required onChange={handleControlledInputChange} />
            </fieldset>
            <button type="submit"
                onClick={evt => {
                    evt.preventDefault() // Prevent browser from submitting the form
                    constructNewEvent()
                }}
                className="btn btn-primary">
                {editMode ? "Update Event" : "Create Event"}
            </button>
        </form>
    )
}
// Console log the checkboxes for values