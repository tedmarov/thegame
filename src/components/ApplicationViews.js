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
import { GameForm } from "./games/GameForm.js"

export const ApplicationViews = (props) => {
    return (
        <>

            <EventProvider>
                <UserEventsProvider>
                    <UserProvider>
                        <GameProvider>
                            <TypeProvider>
                                {/*Goes to Dashboard*/}
                                <Route path="/" render={
                                    props => <Dashboard {...props} />
                                } />

                                <Route path="/events/create" render={
                                    props => <EventForm {...props} />
                                } />

                                <Route path="/games/create" render={
                                    props => <GameForm {...props} />
                                } />

                            </TypeProvider>
                        </GameProvider>
                    </UserProvider>
                </UserEventsProvider>
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

                                <Route path="/events/:eventId(\d+)" render={
                                    props => <EventDetail {...props} />
                                } />
                                <Route path="/events/edit/:eventId(\d+)" render={
                                    props => <EventForm {...props} />
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