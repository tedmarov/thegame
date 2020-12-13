import React, { useState } from "react"

/*
    The context is imported and used by individual components
    that need data
*/
export const UserEventContext = React.createContext()

/*
 This component establishes what data can be used.
 */
export const UserEventsProvider = (props) => {
    const [userEvents, setUserEvents] = useState([])

    const getUserEvents = () => {
        return fetch("http://localhost:8088/userEvents")
            .then(res => res.json())
            .then(setUserEvents)
    }

    const joinUserEvent = event => {
        return fetch("http://localhost:8088/userEvents", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(event)
        })
            .then(getUserEvents)
    }

    /*
        You return a context provider which has the
        `userEvents` state, the `addUser` function,
        and the `getUser` function as keys. This
        allows any child elements to access them.
    */
    return (
        <UserEventContext.Provider value={{
            userEvents, getUserEvents, joinUserEvent
        }}>
            {props.children}
        </UserEventContext.Provider>
    )
}