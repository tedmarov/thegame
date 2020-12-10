import React, { useState, useEffect } from "react"

/*
    The context is imported and used by individual components
    that need data
*/
export const GameContext = React.createContext()

/*
 This component establishes what data can be used.
 */
export const GameProvider = (props) => {
    const [games, setGames] = useState([])

    const getGames = () => {
        return fetch("http://localhost:8088/games")
            .then(res => res.json())
            .then(setGames)
    }

    const addGame = game => {
        return fetch("http://localhost:8088/games", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(game)
        })
            .then(getGames)
    }

    /*
        You return a context provider which has the
        `Games` state, the `addGame` function,
        and the `getGame` function as keys. This
        allows any child elements to access them.
    */
    return (
        <GameContext.Provider value={{
            games, addGame, getGames
        }}>
            {props.children}
        </GameContext.Provider>
    )
}