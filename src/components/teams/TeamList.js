// Teams are a bunch of people, playing the same game, deciding to unite.
// Build out data table on that.

import React, { useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import { TeamContext } from "./TeamProvider.js"
import "./Team.css"

export const TeamList = (props) => {
    // This state changes when `getTeams()` is invoked below
    const { teams, getTeams } = useContext(TeamContext)

    /*
        What's the effect this is reponding to? Component was
        "mounted" to the DOM. React renders blank HTML first,
        then gets the data, then re-renders.
    */
    useEffect(() => {
        console.log("TeamList: Initial render before data")
        getTeams()
    }, [])

    return (
        <article className="teamsWindow">

            {
                teams.map(team => {
                    return (<div className="teamCard" key={team.id}>
                        < Link
                            to={{
                                pathname: `/teams/${team.id}`
                            }} >
                            <h3>{team.teamName}</h3>
                        </Link>
                    </div>
                    )
                })}
        </article>
    )
}