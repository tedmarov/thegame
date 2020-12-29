import React from "react"
import { Route } from "react-router-dom"
import { Dashboard } from "./nav/Dashboard.js"
import { EventList } from "./events/EventList.js"
import { EventDetail } from "./events/EventDetail.js"
import { EventForm } from "./events/EventForm.js"
import { GameList } from "./games/GameList.js"
import { GameForm } from "./games/GameForm.js"
import { GameDetail } from "./games/GameDetail.js"
import { TeamList } from "./teams/TeamList.js"
import { TeamDetail } from "./teams/TeamDetail.js"
import { TeamForm } from "./teams/TeamForm.js"
import { EventProvider } from "./events/EventProvider.js"
import { TypeProvider } from "./games/TypeProvider.js"
import { GameProvider } from "./games/GameProvider.js"
import { UserProvider } from "./users/UserProvider.js"
import { TeamProvider } from "./teams/TeamProvider.js"
import { UserEventsProvider } from "./users/UserEventsProvider.js"
import { UserTeamsProvider } from "./users/UserTeamsProvider.js"

export const ApplicationViews = (props) => {
    return (
        <>

            <UserProvider>
                <EventProvider>
                    <UserEventsProvider>
                        <TeamProvider>
                            <UserTeamsProvider>
                                {/*Goes to Dashboard*/}
                                <Route exact path="/" render={
                                    props => <Dashboard {...props} />
                                } />
                            </UserTeamsProvider>
                        </TeamProvider>
                    </UserEventsProvider>
                </EventProvider>
            </UserProvider>

            <EventProvider>
                <UserEventsProvider>
                    <UserProvider>
                        <GameProvider>
                            <TypeProvider>
                                {/* Render the list when http://localhost:3000/events */}
                                <Route exact path="/events" render={
                                    props => <EventList {...props} />
                                } />
                                <Route path="/events/create" render={
                                    props => <EventForm {...props} />
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

            <TeamProvider>
                <UserTeamsProvider>
                    <UserProvider>
                        {/* Render the list when localhost goes to /teams */}
                        <Route exact path="/teams" render={
                            props => <TeamList {...props} />
                        } />
                        <Route path="/teams/create" render={
                            props => <TeamForm {...props} />
                        } />
                        <Route path="/teams/:teamId(\d+)" render={
                            props => <TeamDetail {...props} />
                        } />
                        <Route path="/teams/edit/:teamId(\d+)" render={
                            props => <TeamForm {...props} />
                        } />
                    </UserProvider>
                </UserTeamsProvider>
            </TeamProvider>

            <GameProvider>
                {/* Render the list when localhost goes to /teams */}
                <Route exact path="/games" render={
                    props => <GameList {...props} />
                } />
                <Route path="/games/create" render={
                    props => <GameForm {...props} />
                } />
                <Route path="/games/:gameId(\d+)" render={
                    props => <GameDetail {...props} />
                } />
                <Route path="/games/edit/:gameId(\d+)" render={
                    props => <GameForm {...props} />
                } />
            </GameProvider>

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