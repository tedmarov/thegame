import React, { useState } from "react"

/*
    The context is imported and used by individual components
    that need data
*/
export const EventContext = React.createContext()

/*
 This component establishes what data can be used.
 */
export const EventProvider = (props) => {
    const [events, setEvents] = useState([])

    const getEvents = () => {
        return fetch("http://localhost:8088/events")
            .then(res => res.json())
            .then(setEvents)
    }

    const addEvent = event => {
        return fetch("http://localhost:8088/events", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(event)
        })
            .then(getEvents)
    }

    const updateEvent = eventId => {
        return fetch(`http://localhost:8088/events/${eventId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(eventId)
        })
            .then(getEvents)
    }

    const deleteEvent = eventId => {
        return fetch(`http://localhost:8088/events/${eventId}`, {
            method: "DELETE",
        })
            .then(getEvents)
    }

    /*
        You return a context provider which has the
        `Events` state, the `addEvent` function,
        and the `getEvent` function as keys. This
        allows any child elements to access them.
    */
    return (
        <EventContext.Provider value={{
            events, addEvent, getEvents
        }}>
            {props.children}
        </EventContext.Provider>
    )
}