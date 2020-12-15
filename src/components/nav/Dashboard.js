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

    const [user, setUser] = useState([])
    const [userEvent, setUserEvent] = useState({})

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
        const user = users.find(u => u.id === parseInt(localStorage.getItem("game_player"))) || {}
        setUser(user)
    }, [users])

    useEffect(() => {
        const attendingUser = userEvents.find(uE => uE.userId === parseInt(localStorage.getItem("game_player"))) || {}
        setUserEvent(attendingUser)
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
                        if (event.eventHostId === user.id || event.id === userEvent.eventId) {
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
                    {events.map(e => {
                        if ((e.id === userEvents.eventId || userEvents.userId === users.id) === Boolean(false)) {
                            return <div className="eventCard">
                                < Link key={e.id}
                                    to={{
                                        pathname: `/events/${e.id}`
                                    }} >
                                    <h4>{e.eventName} at {e.eventLoc}, {e.eventDateAndTime}</h4>
                                </Link>
                            </div>
                        }

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