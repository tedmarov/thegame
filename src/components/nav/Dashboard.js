import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { EventContext } from "../events/EventProvider.js"
import { UserContext } from "../users/UserProvider.js"
import { UserEventContext } from "../users/UserEventsProvider.js"
import "./NavBar.css"


export const Dashboard = (props) => {
    const { events, getEvents } = useContext(EventContext)
    const { users, getUsers } = useContext(UserContext)
    const { userEvents, getUserEvents } = useContext(UserEventContext)

    const [event, setEvent] = useState([])
    const [user, setUser] = useState([])
    const [userEvent, setUserEvent] = useState([])
    const [filteredEventUsers, setFilteredEventUsers] = useState([])

    const playerId = parseInt(localStorage.getItem("game_player"))

    /*
        What's the effect this is reponding to? Component was
        "mounted" to the DOM. React renders blank HTML first,
        then gets the data, then re-renders.
    */
    useEffect(() => {
        console.log("This is a test")
        getEvents()
            .then(getUsers)
            .then(getUserEvents)
    }, [])

    useEffect(() => {
        const event = events.find(e => e.id === userEvent.eventId)
        setEvent(event)
    }, [events])

    useEffect(() => {
        const user = users.find(u => u.id === playerId) || {}
        setUser(user)
    }, [users])

    useEffect(() => {
        const filteredEventUsers = userEvents.filter(uE => uE.userId === playerId) || {}
        setFilteredEventUsers(filteredEventUsers)
    }, [userEvents])

    return (
        <main className="dashboard">
            <header>
                <h2>Welcome, {user.username}.</h2>
            </header>
            <div className="eventsWindow">
                <div className="hostedEvents">
                    <h3>Hosted Events</h3>
                    {events.map(event => {
                        if (event.eventHostId === user.id) {
                            return <div className="eventCard">
                                < Link key={event.id}
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
                    {events.map(event => {
                        return <div className="eventCard">
                            < Link key={event.id}
                                to={{
                                    pathname: `/events/${event.id}`
                                }} >
                                <h4>{filteredEventUsers.map(fEU =>
                                    events.find(joined => fEU.eventId === joined.id).eventName).join(";")}</h4>
                            </Link>
                        </div>
                    })}
                </div>
            </div>
            <button onClick={() => props.history.push("/events/create")}>
                Create Event
            </button>
            <button onClick={() => props.history.push("/games/create")}>
                Add Game
            </button>
        </main>
    )
}