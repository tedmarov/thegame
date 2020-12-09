import React, { useContext, useEffect } from "react"
import { EventContext } from "./EventProvider.js"
import { Event } from "./Event.js"
import "./Events.css"

export const EventList = () => {
    // This state changes when `getEvents()` is invoked below
    const { events, getEvents } = useContext(EventContext)

    /*
        What's the effect this is reponding to? Component was
        "mounted" to the DOM. React renders blank HTML first,
        then gets the data, then re-renders.
    */
    useEffect(() => {
        console.log("EventList: Initial render before data")
        getEvents()
    }, [])

    /*
        This effect is solely for learning purposes. The effect
        it is responding to is that the Event state changed.
    */
    useEffect(() => {
        console.log("EventList: Event state changed")
        console.log(events)
    }, [events])

    return (
        <div className="events">
            {
                events.map(eve => <Event key={eve.id} event={eve} />)
            }
        </div>
    )
}