import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { EventContext } from "../events/EventProvider.js"
import { UserContext } from "../users/UserProvider.js"
import { UserEventContext } from "../users/UserEventsProvider.js"
import "./NavBar.css"


export const Dashboard = (props) => {
    const { events, getEvents } = useContext(EventContext)
    const { users, getUsers } = useContext(UserContext)
    const { userEventsExpanded, getUserEvents, getUserEventsExpanded } = useContext(UserEventContext)

    const [event, setEvent] = useState([])
    const [user, setUser] = useState([])
    const [userEvent, setUserEvent] = useState([])

    const playerId = parseInt(localStorage.getItem("game_player"))

    /*
        What's the effect this is reponding to? Component was
        "mounted" to the DOM. React renders blank HTML first,
        then gets the data, then re-renders.
    */
    useEffect(() => {
        console.log("This is a test")
        getUsers()
            .then(getUserEvents)
            .then(getUserEventsExpanded)
            .then(getEvents)
    }, [])

    useEffect(() => {
        const event = events.find(e => e.id === userEvent.eventId)
        setEvent(event)
    }, [events])

    useEffect(() => {
        const user = users.find(u => u.id === playerId) || {}
        setUser(user)
    }, [users])

    return (
        <main className="dashboard">
            <section>
                <header>
                    <h2>Welcome, {user.username}.</h2>
                </header>
                <article className="eventsWindow">
                    <div className="hostedEvents">
                        <h3>Hosted Events</h3>
                        {events.map(event => {
                            if (event.eventHostId === playerId) {
                                return <div className="eventCard" key={event.id}>
                                    < Link
                                        to={{
                                            pathname: `/events/${event.id}`
                                        }} >
                                        <h4>{event.eventName} at {event.eventLoc}, {event.eventDateAndTime}</h4>
                                    </Link>
                                </div>
                            }

                        })}
                    </div>
                    <div>
                        <h3>Joined Events</h3>
                        {userEventsExpanded.map(event => {
                            if (event.userId === playerId)
                                return <div className="eventCard" key={event.id}>
                                    < Link
                                        to={{
                                            pathname: `/events/${event.event.id}`
                                        }} >
                                        <h4>{event.event.eventName} at {event.event.eventLoc}, {event.event.eventDateAndTime}</h4>
                                    </Link>
                                </div>
                        })}
                    </div>
                </article>
                <button onClick={() => props.history.push("/events/create")}>
                    Create Event
                </button>
                <button onClick={() => props.history.push("/games/create")}>
                    Add Game
                </button>
            </section>
        </main>
    )
}