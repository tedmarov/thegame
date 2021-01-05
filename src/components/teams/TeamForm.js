// Just the basics.
// A group of people, playing the same game, deciding to unite.
// Base it off of the ERD

import React, { useContext, useEffect, useState } from "react"
import { TeamContext } from "./TeamProvider.js"

export const TeamForm = (props) => {
    const { teams, addTeam, updateTeam, getTeams, deleteTeam } = useContext(TeamContext)

    // Component state
    const [team, setTeam] = useState({})

    // Something of a URL parameter
    const editMode = props.match.params.hasOwnProperty("teamId")

    const handleControlledInputChange = (e) => {
        /*
            When changing a state object or array, always create a new one
            and change state instead of modifying current one
        */
        const newTeam = Object.assign({}, team)
        newTeam[e.target.name] = e.target.value
        setTeam(newTeam)
    }

    /*
        If there is a URL parameter, then the user has chosen to
        edit an animal.
            1. Get the value of the URL parameter.
            2. Use that `id` to find the animal.
            3. Update component state variable.
    */

    const getTeamInEditMode = () => {
        if (editMode) {
            const teamId = parseInt(props.match.params.teamId)
            const selectedTeam = teams.find(t => t.id === teamId) || {}
            setTeam(selectedTeam)
        }
    }
    /*
        Get Teams, types, games state on initialization.
    */
    useEffect(() => {
        getTeams()
    }, [])

    /* Once provider state is updated, determine the Team, if edited */

    useEffect(() => {
        getTeamInEditMode()
    }, [teams])

    const constructNewTeam = () => {


        /*
            The `location` and `products` variables below are
            the  attached to the input fields. You
            can't just ask for the `.value` property directly,
            but rather `.current.value` now in React.
        */

        const teamName = team.teamName
        const description = team.description

        if (teamName === "" || description === "") {
            window.alert("Please don't leave any empty fields")
        } else {
            if (editMode) {
                updateTeam({
                    teamName: team.teamName,
                    teamLeaderId: parseInt(localStorage.getItem("game_player")),
                    description: team.description,
                    id: team.id,
                })
                    .then(() => props.history.push("/teams"))
            } else {
                addTeam({
                    teamName: team.teamName,
                    teamLeaderId: parseInt(localStorage.getItem("game_player")),
                    description: team.description
                })
                    .then(() => props.history.push("/teams"))
            }
        }
    }

    return (
        <main className="container--main">
            <section>
                <form className="form--main">
                    <fieldset>
                        <h2>{editMode ? "Update Team" : "New Team"}</h2>
                    </fieldset>
                    <fieldset>
                        <label htmlFor="teamName">Team name: </label>
                        <input type="text" name="teamName"
                            required autoFocus
                            className="form-control"
                            placeholder="Team name"
                            value={team.teamName}
                            onChange={handleControlledInputChange} />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="description"> Short Description </label>
                        <textarea type="text" rows="3" cols="20"
                            name="description"
                            placeholder="Tell us a little about your team"
                            value={team.description}
                            required onChange={handleControlledInputChange} />
                    </fieldset>
                </form>
                <fieldset>
                    <button type="submit"
                        onClick={evt => {
                            evt.preventDefault() // PrTeam browser from submitting the form
                            constructNewTeam()
                        }}>
                        {editMode ? "Update Team" : "Create Team"}
                    </button>
                </fieldset>
                {editMode && <fieldset>
                    <button
                        onClick={() => {
                            deleteTeam(team.id)
                                .then(() => {
                                    props.history.push("/teams")
                                })
                        }}>Delete Team</button>
                </fieldset>}
            </section>
        </main>
    )
}
// Console log the checkboxes for values