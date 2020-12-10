import React from "react";
import { Route, Redirect } from "react-router-dom"
import { ApplicationViews } from "./ApplicationViews"
import { NavBar } from "./nav/NavBar"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import { AgeRangeProvider } from "./auth/ageRangeProvider.js"
import "./TheGame.css"

export const TheGame = () => (
    <>
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
        <AgeRangeProvider>
            <Route path="/register" render={props => <Register {...props} />} />
        </AgeRangeProvider>
    </>
)