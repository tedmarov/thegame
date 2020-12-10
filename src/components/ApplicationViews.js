import React from "react"
import { Route } from "react-router-dom"
import { EventProvider } from "./events/EventProvider.js"
import { TypeProvider } from "./games/TypeProvider.js"
import { GameProvider } from "./games/GameProvider.js"
import { EventList } from "./events/EventList.js"
import { Dashboard } from "./nav/Dashboard.js"
import { EventForm } from "./events/EventForm.js"

export const ApplicationViews = (props) => {
    return (
        <>

            <GameProvider>
                <TypeProvider>

                    <EventProvider>
                        {/*Goes to Dashboard*/}
                        <Route exact path="/dashboard" render={
                            props => <Dashboard {...props} />
                        } />


                        <Route exact path="/events/create" render={
                            props => <EventForm {...props} />
                        } />
                    </EventProvider>
                </TypeProvider>
            </GameProvider>

            <EventProvider>
                {/* Render the Event list when http://localhost:3000/ */}
                <Route exact path="/events" render={
                    props => <EventList {...props} />
                } />

            </EventProvider>

        </>
    )
}

/* import {AnimalProvider} from "./animal/AnimalProvider"
import {AnimalList} from "./animal/AnimalList"
 <AnimalProvider>
                    {/* Render the animal list when http://localhost:3000/animals }}
    <Route path="/events">
        <AnimalList />
    </Route>
</AnimalProvider> */