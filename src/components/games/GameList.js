// I want to try having a dropdown menu render and a game appear based on that choice
// Create game, and pass a value on that choice

import React, { useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import { GameContext } from "./GameProvider.js"
import "./Game.css"

export const GameList = (props) => {
    // This state changes when `getGames()` is invoked below
    const { games, getGames } = useContext(GameContext)

    /*
        What's the effect this is reponding to? Component was
        "mounted" to the DOM. React renders blank HTML first,
        then gets the data, then re-renders.
    */
    useEffect(() => {
        console.log("GameList: Initial render before data")
        getGames()
    }, [])

    /*
        This effect is solely for learning purposes. The effect
        it is responding to is that the Game state changed.
    */
    // useEffect(() => {
    //     console.log("GameList: Game state changed")
    //     console.log(Games)
    // }, [Games])

    return (
        <article className="gamesWindow">

            {
                games.map(game => {
                    return (<div className="gameCard" key={game.id}>
                        < Link
                            to={{
                                pathname: `/games/${game.id}`
                            }} >
                            <h3>{game.title}</h3>
                        </Link>
                    </div>
                    )
                })}
        </article>
    )
}