import React, { useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import { EventContext } from "../events/EventProvider.js"
import { Event } from "../events/Event.js"
import "./NavBar.css"


export const Dashboard = (props) => {
    const { events, getEvents } = useContext(EventContext)

    /*
        What's the effect this is reponding to? Component was
        "mounted" to the DOM. React renders blank HTML first,
        then gets the data, then re-renders.
    */
    useEffect(() => {
        console.log("This is a test")
        getEvents()
    }, [])

    return (
        <>
            <main className="dashboard">
                Welcome, username.
                <div className="eventsWindow">
                    {
                        events.map(eve => <Event key={eve.id} event={eve} />)
                    }
                </div>
                <button onClick={() => props.history.push("/event/create")}>
                    Create Event
                </button>
            </main>
        </>
    )
}