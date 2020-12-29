import React, { useState, useEffect, useContext } from "react"
import { GameContext } from "./GameProvider.js"
import "./Game.css"

// HYPOTHESIS, PSEUDOCODE, LOGIC BEFORE IMPLEMENT
// Attendee > pull in data from 3 tables > start from Games
// Use userGame.GameId from userGame to match userGame.GameId to Games.id
// To get to the users table > match users.id to userGame.userid

export const GameDetail = (props) => {
    const { games, getGames } = useContext(GameContext)

    const [game, setGame] = useState({})

    useEffect(() => {
        getGames()
    }, [])

    useEffect(() => {
        const game = games.find(t => t.id === parseInt(props.match.params.gameId)) || {}
        setGame(game)
    }, [games])

    // Render logic on 

    return (
        <article className="gamesWindow">
            <section className="gameDetail">
                <h3>Game Details: </h3>
                <h2>Name of the Game: {game.title}</h2>
                <h3>Some basic ground rules: {game.description}</h3>
                <button className="editGame" onClick={() => props.history.push(`/games/edit/${game.id}`)}>Edit Game</button>
            </section >
        </article>
    )
}