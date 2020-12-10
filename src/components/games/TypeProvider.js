import React, { useState, useEffect } from "react"

/*
    The context is imported and used by individual components
    that need data
*/
export const TypeContext = React.createContext()

/*
 This component establishes what data can be used.
 */
export const TypeProvider = (props) => {
    const [types, setTypes] = useState([])

    const getTypes = () => {
        return fetch("http://localhost:8088/types")
            .then(res => res.json())
            .then(setTypes)
    }

    const addType = type => {
        return fetch("http://localhost:8088/types", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(type)
        })
            .then(getTypes)
    }

    /*
        You return a context provider which has the
        `Types` state, the `addType` function,
        and the `getType` function as keys. This
        allows any child elements to access them.
    */
    return (
        <TypeContext.Provider value={{
            types, addType, getTypes
        }}>
            {props.children}
        </TypeContext.Provider>
    )
}