import React from "react"
import { Route } from "react-router-dom"
import { EventProvider } from "./events/EventProvider.js"
import { TypeProvider } from "./games/TypeProvider.js"
import { GameProvider } from "./games/GameProvider.js"
import { UserProvider } from "./users/UserProvider.js"
import { UserEventsProvider } from "./users/UserEventsProvider.js"
import { EventList } from "./events/EventList.js"
import { Dashboard } from "./nav/Dashboard.js"
import { EventForm } from "./events/EventForm.js"
import { EventDetail } from "./events/EventDetail.js"

export const ApplicationViews = (props) => {
    return (
        <>

            <EventProvider>
                <UserProvider>
                    <GameProvider>
                        <TypeProvider>
                            {/*Goes to Dashboard*/}
                            <Route exact path="/dashboard" render={
                                props => <Dashboard {...props} />
                            } />


                            <Route exact path="/events/create" render={
                                props => <EventForm {...props} />
                            } />

                        </TypeProvider>
                    </GameProvider>
                </UserProvider>
            </EventProvider>

            <EventProvider>
                <UserEventsProvider>
                    <UserProvider>
                        <GameProvider>
                            <TypeProvider>
                                {/* Render the list when http://localhost:3000/events */}
                                <Route exact path="/events" render={
                                    props => <EventList {...props} />
                                } />

                                <Route exact path="/events/:eventId(\d+)" render={
                                    props => <EventDetail {...props} />
                                } />

                            </TypeProvider>
                        </GameProvider>
                    </UserProvider>
                </UserEventsProvider>
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