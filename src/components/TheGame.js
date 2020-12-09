import React from "react";
import { Route, Redirect } from "react-router-dom"
import { ApplicationViews } from "./ApplicationViews"
import { NavBar } from "./nav/NavBar"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import "./TheGame.css"

export const TheGame = () => (
    <>
        <h2>The Game</h2>
        <small>Anytime you play, think of The Game</small>
        <address>
            <div>Visit us at our campus</div>
            <div>301 Plus Park Blvd #300</div>
        </address>
        <Route render={() => {
            if (localStorage.getItem("game_player")) {
                return (
                    <>
                        <Route render={props => <NavBar {...props} />} />
                        <Route render={props => <ApplicationViews {...props} />} />
                    </>
                )
            } else {
                return <Redirect to="/login" />
            }
        }} />

        <Route path="/login" render={props => <Login {...props} />} />
        <Route path="/register" render={props => <Register {...props} />} />
    </>
)