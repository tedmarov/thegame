import React, { useContext, useRef, useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { TeamContext } from "./TeamProvider.js"
import { UserContext } from "../users/UserProvider.js"
import { UserTeamContext } from "../users/UserTeamsProvider.js"
import "./Team.css"

// HYPOTHESIS, PSEUDOCODE, LOGIC BEFORE IMPLEMENT
// Attendee > pull in data from 3 tables > start from teams
// Use userTeam.TeamId from userTeam to match userTeam.teamId to teams.id
// To get to the users table > match users.id to userTeam.userid

export const TeamDetail = (props) => {
    const { users, getUsers } = useContext(UserContext)
    const { teams, getTeams } = useContext(TeamContext)
    const { userTeams, getUserTeams, joinUserTeam, userTeamsExpanded, getUserTeamsExpanded } = useContext(UserTeamContext)

    const [user, setUser] = useState({})
    const [team, setTeam] = useState({})
    const [filteredUserTeams, setFilteredUserTeams] = useState([])
    const [filteredUserTeamsExpanded, setFilteredUserTeamsExpanded] = useState([])

    const playerId = parseInt(localStorage.getItem("game_player"))
    const conflictDialog = useRef()

    useEffect(() => {
        getTeams()
            .then(getUsers)
            .then(getUserTeams)
            .then(getUserTeamsExpanded)
    }, [])

    useEffect(() => {
        const user = users.find(u => u.id === team.teamLeaderId) || {}
        setUser(user)
    }, [users])

    useEffect(() => {
        const team = teams.find(t => t.id === parseInt(props.match.params.teamId)) || {}
        setTeam(team)
    }, [teams])

    useEffect(() => {
        const filteredUserTeams = userTeams.filter(uT => uT.teamId === team.id) || {}
        setFilteredUserTeams(filteredUserTeams)
    }, [userTeams])

    useEffect(() => {
        const filteredUserTeamsExpanded = userTeamsExpanded.filter(uTE => uTE.teamId === team.id) || {}
        setFilteredUserTeamsExpanded(filteredUserTeamsExpanded)
    }, [userTeamsExpanded])

    // This section will probaby have the joinTeam function. It takes (Team) as a parameter
    const teamId = team.id
    const userId = playerId

    // Existing teammate check; involves userTeams
    // Need clarification
    const existingTeammateCheck = () => {
        return fetch(`http://localhost:8088/userTeams?teamId=${teamId}&userId=${userId}`)
            .then(_ => _.json())
            .then(teammate => !!teammate.length)
    }

    // Takes no arguments but executes joinTeam after checking
    const joinNewTeam = () => {
        existingTeammateCheck()
            .then((teammateExists) => {
                if (!teammateExists) {
                    joinUserTeam(
                        userId,
                        teamId
                    ).then(props.history.push("/"))
                }
                else {
                    conflictDialog.current.showModal()
                }
            }
            )
    }

    // Render logic on 

    const verifyLeader = (playerId) => {
        if (playerId === parseInt(team.teamLeaderId))
            return Boolean(true);
    }

    const verifyTeammate = (playerId) => {
        if (playerId === parseInt(user.id))
            return Boolean(true);
    }

    return (
        <article className="teamsWindow">
            <dialog className="dialog dialog--teammate" ref={conflictDialog}>
                <div>You're already a teammate</div>
                <button className="button--close" onClick={e => conflictDialog.current.close()}>Close</button>
            </dialog>
            <section className="teamDetail">
                <h3>Team Details: </h3>
                <h2>WE ARE {team.teamName} THE MIGHTY, MIGHTY {team.teamName}</h2>
                <div>You know our team's motto, right? {team.description}</div>
                <h3>And of course, our fearless leader: {user.username}</h3>
                <div className="teamLineup">
                    And our teammates:
                                {filteredUserTeamsExpanded.map(fUTE => {
                    if (fUTE.teamId === team.id)
                        return <div key={fUTE.user.id}>
                            {console.log(user)}
                            <Link
                                to={{
                                    pathname: `/users/${fUTE.userId}`
                                }} >
                                <h4>{fUTE.user.username}</h4>
                            </Link>
                        </div>
                })}
                </div>
                <button className="joinTeam"
                    onClick={(e) => {
                        joinNewTeam(e)
                    }}>Join Team</button>
                {verifyLeader(playerId) ? <button className="editTeam"
                    onClick={() => props.history.push(`/teams/edit/${team.id}`
                    )}>Edit Team</button> : ""}
            </section >
        </article >
    )
}