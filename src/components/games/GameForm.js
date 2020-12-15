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
        <form className="gameForm">
            <h2 className="gameForm__title">New game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameName">Game title:</label>
                    <input type="text" name="gameName" ref={title} required autoFocus classname="form-control" placeholder="Game title" />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameDesc">Game description:</label>
                    <textarea type="text" rows="3" cols="20"
                        name="gameDesc" ref={desc}
                        required autoFocus
                        classname="form-control"
                        placeholder="Game description" />
                </div>
            </fieldset>
            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()
                    constructNewGame()
                }}
                className="btn btn-primary">
                Add Game
            </button>
        </form>
    )
}



