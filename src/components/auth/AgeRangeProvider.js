import React, { useState } from "react"

/*
    The context is imported and used by individual components
    that need data
*/
export const AgeRangeContext = React.createContext()

/*
 This component establishes what data can be used.
 */
export const AgeRangeProvider = (props) => {
    const [ageRanges, setAgeRanges] = useState([])

    const getAgeRanges = () => {
        return fetch("http://localhost:8088/ageRange")
            .then(res => res.json())
            .then(setAgeRanges)
    }

    /*
        You return a context provider which has the
        `AgeRanges` state, the `addAgeRange` function,
        and the `getAgeRange` function as keys. This
        allows any child elements to access them.
    */
    return (
        <AgeRangeContext.Provider value={{
            ageRanges, getAgeRanges
        }}>
            {props.children}
        </AgeRangeContext.Provider>
    )
}