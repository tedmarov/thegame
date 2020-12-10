import React from "react"
import "./Event.css"

export const Event = ({ event }) => (
    <section className="event">
        <h3 className="event__name">{event.eventName}</h3>
        <div className="event__address">Address: {event.eventLoc}</div>
        <div className="event__address">Date: {event.eventDate}</div>
        <div className="event__address">Details: {event.details}</div>
    </section>
)