import React, { useState, useEffect, useContext } from "react"
import { GameContext } from "../games/GameProvider.js"
import { TypeContext } from "../games/TypeProvider.js"
import { UserContext } from "../users/UserProvider.js"
import { EventContext } from "./EventProvider.js"
import { UserEventContext } from "../users/UserEventsProvider.js"
import "./Event.css"

//Attendee > pull in data from 3 tables > start from events, use userEvent.EventId from userEvent to match userEvent.EventId to events.id
// To get to the users table > match users.id to userEvent.userid

export const EventDetail = (props) => {
    const { games, getGames } = useContext(GameContext)
    const { types, getTypes } = useContext(TypeContext)
    const { users, getUsers } = useContext(UserContext)
    const { events, getEvents } = useContext(EventContext)
    const { userEvents, getUserEvents } = useContext(UserEventContext)

    const [game, setGame] = useState({})
    const [event, setEvent] = useState({})
    const [type, setType] = useState({})
    const [user, setUser] = useState({})
    const [userEvent, setUserEvent] = useState({})

    useEffect(() => {
        getEvents()
            .then(getGames)
            .then(getTypes)
            .then(getUsers)
            .then(getUserEvents)
    }, [])

    useEffect(() => {
        const game = games.find(g => g.id === event.gameId) || {}
        setGame(game)
    }, [games])

    useEffect(() => {
        const event = events.find(e => e.id === parseInt(props.match.params.eventId)) || {}
        setEvent(event)
    }, [events])

    useEffect(() => {
        const type = types.find(t => t.id === event.typeId) || {}
        setType(type)
    }, [types])

    useEffect(() => {
        const user = users.find(u => u.id === event.eventHostId) || {}
        setUser(user)
    }, [users])

    useEffect(() => {
        const userEvent = userEvents.find(uE => uE.eventId === event.id && uE.userId === users.id) || {}
        setUserEvent(userEvent)
        console.log(userEvent)
    }, [userEvents])

    // This section will probaby have the joinEvent function. It takes (event) as a parameter

    // const joinEvent = (event) => {

    // const attendee = parseInt(localStorage.getItem("game_player"))

    // console.log(props)
    // joinEvent({
    //     attendeeId,
    //     eventId
    // })
    //     .then(() => props.history.push("/events"))


    return (
        <section className="eventDetail">
            <h3>Event Detail: </h3>
            <h2>{event.eventName} at {event.eventLoc} on {event.eventDateAndTime}</h2>
            <div>Game: {game.title} Category: {type.category}</div>
            <div>Hosted By: {user.username}</div>
            <h3>Details: {event.details}</h3>
            <div>Going:
                {props.event.state.chosenEvent.users.map(u => u.username).join(", ")}
            </div>
            <button>Join Event</button>
        </section>
    )
}