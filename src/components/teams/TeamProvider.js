// get, Add, Delete, Edit.
// Figure out how to Delete members from join table.

import React, { useState } from "react"

/*
    The context is imported and used by individual components
    that need data
*/
export const TeamContext = React.createContext()

/*
 This component establishes what data can be used.
 */
export const TeamProvider = (props) => {
    const [teams, setTeams] = useState([])

    const getTeams = () => {
        return fetch("http://localhost:8088/teams")
            .then(res => res.json())
            .then(setTeams)
    }

    const addTeam = team => {
        return fetch("http://localhost:8088/teams", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(team)
        })
            .then(getTeams)
    }

    const updateTeam = team => {
        return fetch(`http://localhost:8088/teams/${team.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(team)
        })
            .then(getTeams)
    }

    const deleteTeam = teamId => {
        return fetch(`http://localhost:8088/teams/${teamId}`, {
            method: "DELETE",
        })
            .then(getTeams)
    }

    /*
        You return a context provider which has the
        `Teams` state, the `addTeam` function,
        and the `getTeam` function as keys. This
        allows any child elements to access them.
    */
    return (
        <TeamContext.Provider value={{
            teams, addTeam, getTeams, updateTeam, deleteTeam
        }}>
            {props.children}
        </TeamContext.Provider>
    )
}