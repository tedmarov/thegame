import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { EventContext } from "../events/EventProvider.js"
import { UserContext } from "../users/UserProvider.js"
import "./NavBar.css"


export const Dashboard = (props) => {
    const { events, getEvents } = useContext(EventContext)
    const { users, getUsers } = useContext(UserContext)

    const [user, setUser] = useState([])

    /*
        What's the effect this is reponding to? Component was
        "mounted" to the DOM. React renders blank HTML first,
        then gets the data, then re-renders.
    */
    useEffect(() => {
        console.log("This is a test")
        getEvents()
            .then(getUsers)
    }, [])

    useEffect(() => {
        const user = users.find(u => u.id === parseInt(localStorage.getItem("game_player"))) || {}
        setUser(user)
    }, [users])

    return (
        <main className="dashboard">
            <h2>Welcome, {user.username}.</h2>
            <div className="eventsWindow">
                {events.map(event => {
                    return (<div className="eventCard">
                        < Link key={event.id}
                            to={{
                                pathname: `/events/${event.id}`
                            }} >
                            <h4>{event.eventName} at {event.eventLoc}, {event.eventDateAndTime}</h4>
                        </Link>
                    </div>)
                })}
            </div>
            <button onClick={() => props.history.push("/events/create")}>
                Create Event
                </button>
        </main>
    )
}