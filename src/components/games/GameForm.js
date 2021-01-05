// Just the basics.
// A group of people, playing the same game, deciding to unite.
// Base it off of the ERD

import React, { useContext, useEffect, useState } from "react"
import { GameContext } from "./GameProvider.js"

export const GameForm = (props) => {
    const { games, addGame, updateGame, getGames, deleteGame } = useContext(GameContext)

    // Component state
    const [game, setGame] = useState({})

    // Something of a URL parameter
    const editMode = props.match.params.hasOwnProperty("gameId")

    const handleControlledInputChange = (e) => {
        /*
            When changing a state object or array, always create a new one
            and change state instead of modifying current one
        */
        const newGame = Object.assign({}, game)
        newGame[e.target.name] = e.target.value
        setGame(newGame)
    }

    /*
        If there is a URL parameter, then the user has chosen to
        edit an animal.
            1. Get the value of the URL parameter.
            2. Use that `id` to find the animal.
            3. Update component state variable.
    */

    const getGameInEditMode = () => {
        if (editMode) {
            const gameId = parseInt(props.match.params.gameId)
            const selectedGame = games.find(g => g.id === gameId) || {}
            setGame(selectedGame)
        }
    }

    /*
        Get Games, types, games state on initialization.
    */
    useEffect(() => {
        getGames()
    }, [])

    /* Once provider state is updated, determine the Game, if edited */

    useEffect(() => {
        getGameInEditMode()
    }, [games])

    const constructNewGame = () => {


        /*
            The `location` and `products` variables below are
            the  attached to the input fields. You
            can't just ask for the `.value` property directly,
            but rather `.current.value` now in React.
        */

        if (game.title === "" || game.description === "") {
            window.alert("Please don't leave any empty fields")
        } else {
            if (editMode) {
                updateGame({
                    title: game.title,
                    description: game.description,
                    id: game.id,
                })
                    .then(() => props.history.push("/games"))
            } else {
                addGame({
                    title: game.title,
                    description: game.description
                })
                    .then(() => props.history.push("/games"))
            }
        }
    }

    return (
        <main className="container--main">
            <section>
                <form className="form--main">
                    <fieldset>
                        <h2>{editMode ? "Update Game" : "New Game"}</h2>
                    </fieldset>
                    <fieldset>
                        <label htmlFor="title">Game name: </label>
                        <input type="text" name="title"
                            required autoFocus
                            className="form-control"
                            placeholder="Game name"
                            value={game.title}
                            onChange={handleControlledInputChange} />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="description"> Short Description </label>
                        <textarea type="text" rows="3" cols="20"
                            name="description"
                            placeholder="Tell us a little about your Game"
                            value={game.description}
                            required onChange={handleControlledInputChange} />
                    </fieldset>
                </form>
                <fieldset>
                    <button type="submit"
                        onClick={evt => {
                            evt.preventDefault() // PrGame browser from submitting the form
                            constructNewGame()
                        }}>
                        {editMode ? "Update Game" : "Create Game"}
                    </button>
                </fieldset>
                {editMode && <fieldset>
                    <button
                        onClick={() => {
                            deleteGame(game.id)
                                .then(() => {
                                    props.history.push("/games")
                                })
                        }}>Delete Game</button>
                </fieldset>}
            </section>
        </main>
    )
}
// Console log the checkboxes for values