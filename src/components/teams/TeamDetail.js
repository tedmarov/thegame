import React, { useState, useEffect, useContext } from "react"
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
    const { userTeams, getUserTeams, joinUserTeam } = useContext(UserTeamContext)

    const [user, setUser] = useState({})
    const [team, setTeam] = useState({})
    const [filteredUserTeams, setFilteredUserTeams] = useState([])

    const userId = parseInt(localStorage.getItem("game_player"))

    useEffect(() => {
        getTeams()
            .then(getUsers)
            .then(getUserTeams)
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

    // This section will probaby have the joinTeam function. It takes (Team) as a parameter

    const joinNewTeam = (e) => {
        const teamId = team.id
        console.log(props)
        joinUserTeam({
            userId,
            teamId
        })
    }

    // Render logic on 

    const verifyHost = (userId) => {
        if (userId === team.teamLeaderId)
            return Boolean(true);
    }

    return (
        <article className="teamsWindow">
            <section className="teamDetail">
                <h3>Team Details: </h3>
                <h2>WE ARE {team.teamName} THE MIGHTY, MIGHTY {team.teamName}</h2>
                <h3>You know our team's motto, right? {team.description}</h3>
                <div>And of course, our fearless leader, {user.username}</div>
                <div>Members: {
                    filteredUserTeams.map(fUE => users.find(teammate => fUE.userId === teammate.id).username).join(", ")}
                </div>
                <button className="joinTeam" onClick={(e) => { joinNewTeam(e) }}>Join Team</button>
                {verifyHost(userId) ? <button className="editTeam" onClick={() => props.history.push(`/teams/edit/${team.id}`)}>Edit Team</button> : ""}
            </section >
        </article>
    )
}