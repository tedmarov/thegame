import React, { useContext, useEffect, useState, useRef } from "react"
import { GameContext } from "./GameProvider.js"

export const GameForm = (props) => {
    const { games, getGames, addGame } = useContext(GameContext)

    const title = useRef(null)
    const desc = useRef(null)

    // Component state, if future edit
    // const [game, setGame] = useState({})

    // URL parameter, if I want to edit. Also need a handle.

    // Gets games on initialization
    // useEffect(() => {
    //     getGames()
    // }, [])

    const constructNewGame = () => {

        if (title.current.value === "" || desc.current.value === "") {
            window.alert("Please enter all values.")
        } else {
            addGame({
                title: title.current.value,
                desc: desc.current.value
            })
                .then(() => props.history.push("/"))
        }
    }

    return (
        <main className="container--main">

            <form className="form--main">
                <h2 className>New game</h2>
                <fieldset>
                    <label htmlFor="gameName">Game title:</label>
                    <input type="text" name="gameName" ref={title} required
                        autoFocus
                        className="form-control" placeholder="Game title" />
                </fieldset>
                <fieldset>
                    <label htmlFor="gameDesc">Game description:</label>
                    <textarea type="text" rows="3" cols="20"
                        name="gameDesc" ref={desc}
                        required
                        className="form-control"
                        placeholder="Game description" />
                </fieldset>
            </form>
            <fieldset>
                <button type="submit"
                    onClick={evt => {
                        evt.preventDefault()
                        constructNewGame()
                    }}
                    className="btn btn-primary">
                    Add Game
            </button>
            </fieldset>
        </main>
    )
}



