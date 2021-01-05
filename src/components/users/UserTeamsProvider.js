import React, { useState } from "react"

/*
    The context is imported and used by individual components
    that need data
*/
export const UserTeamContext = React.createContext()

/*
 This component establishes what data can be used.
 */
export const UserTeamsProvider = (props) => {
    const [userTeams, setUserTeams] = useState([])
    const [userTeamsExpanded, setUserTeamsExpanded] = useState([])

    const getUserTeams = () => {
        return fetch("http://localhost:8088/userTeams")
            .then(res => res.json())
            .then(setUserTeams)
    }

    const joinUserTeam = (userId, teamId) => {
        return fetch("http://localhost:8088/userTeams", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId,
                teamId
            })
        })
            .then(_ => _.json())
            .then(getUserTeams)
    }

    const getUserTeamsExpanded = () => {
        return fetch(`http://localhost:8088/userTeams?_expand=user&_expand=team`)
            .then(res => res.json())
            .then(setUserTeamsExpanded)
    }

    /*
        You return a context provider which has the
        `userTeams` state, the `addUser` function,
        and the `getUser` function as keys. This
        allows any child elements to access them.
    */
    return (
        <UserTeamContext.Provider value={{
            userTeams, getUserTeams, joinUserTeam, userTeamsExpanded, getUserTeamsExpanded
        }}>
            {props.children}
        </UserTeamContext.Provider>
    )
}