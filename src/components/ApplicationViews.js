import React from "react"
import { Route } from "react-router-dom"
import { EventProvider } from "./events/EventProvider.js"
import { EventList } from "./events/EventList.js"

export const ApplicationViews = (props) => {
    return (
        <>
            <EventProvider>
                {/* Render the Event list when http://localhost:3000/ */}
                <Route exact path="/">
                    <EventList />
                </Route>
            </EventProvider>

        </>
    )
}

/* import { AnimalProvider } from "./animal/AnimalProvider"
import { AnimalList } from "./animal/AnimalList"
 <AnimalProvider>
{/* Render the animal list when http://localhost:3000/animals }}
    <Route path="/events">
        <AnimalList />
    </Route>
</AnimalProvider> */