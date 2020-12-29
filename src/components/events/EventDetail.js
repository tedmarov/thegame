import React, { useState, useEffect, useContext } from "react"
import { GameContext } from "../games/GameProvider.js"
import { TypeContext } from "../games/TypeProvider.js"
import { UserContext } from "../users/UserProvider.js"
import { EventContext } from "./EventProvider.js"
import { UserEventContext } from "../users/UserEventsProvider.js"
import "./Event.css"

// Attendee > pull in data from 3 tables > start from events
// Use userEvent.EventId from userEvent to match userEvent.EventId to events.id
// To get to the users table > match users.id to userEvent.userid

export const EventDetail = (props) => {
    const { games, getGames } = useContext(GameContext)
    const { types, getTypes } = useContext(TypeContext)
    const { users, getUsers } = useContext(UserContext)
    const { events, getEvents } = useContext(EventContext)
    const { userEvents, getUserEvents, joinUserEvent } = useContext(UserEventContext)

    const [game, setGame] = useState({})
    const [event, setEvent] = useState({})
    const [type, setType] = useState({})
    const [user, setUser] = useState({})
    const [filteredUserEvents, setFilteredUserEvents] = useState([])

    const userId = parseInt(localStorage.getItem("game_player"))

    // Existing user check; will involve 
    // const existingAttendeeCheck = () => {
    //     return fetch(`http://localhost:8088/events?username=${username.current.value}`)
    //         .then(_ => _.json())
    //         .then(user => !!user.length)
    // }

    http://localhost:8088/userEvents?_expand=user&_expand=event

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
        const filteredUserEvents = userEvents.filter(uE => uE.eventId === event.id) || {}
        setFilteredUserEvents(filteredUserEvents)
    }, [userEvents])

    // This section will probaby have the joinEvent function. It takes (event) as a parameter

    const joinNewEvent = (e) => {
        const eventId = event.id
        console.log(props)
        joinUserEvent({
            userId,
            eventId
        })
    }

    // Render logic on 

    const verifyHost = (userId) => {
        if (userId === event.eventHostId)
            return Boolean(true);
    }

    return (
        <article className="eventsWindow">
            <section className="eventDetail">
                <h3>Event Detail: </h3>
                <h3>Is it still on? {event.isActive ? "It's still on!" : "It's cancelled!"}</h3>
                <h2>{event.eventName} at {event.eventLoc} on {event.eventDateAndTime}</h2>
                <div>Game: {game.title}</div>
                <div>Category: {type.category}</div>
                <div>Hosted By: {user.username}</div>
                <h3>Details: {event.details}</h3>
                <div>Going: {
                    filteredUserEvents.map(fUE => users.find(attendee => fUE.userId === attendee.id).username).join(", ")}
                </div>
                <button className="joinEvent" onClick={(e) => { joinNewEvent(e) }}>Join Event</button>
                {verifyHost(userId) ? <button className="editEvent" onClick={() => props.history.push(`/events/edit/${event.id}`)}>Edit Event</button> : ""}
            </section >
        </article>
    )
}