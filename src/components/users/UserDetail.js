import React, { useContext, useState, useEffect } from "react"
import { UserContext } from "./UserProvider.js"
import { AgeRangeContext } from "../auth/AgeRangeProvider.js"
import "./User.css"

//Get data from user table.

export const UserDetail = (props) => {
    const { users, getUsers } = useContext(UserContext)
    const { ageRanges, getAgeRanges } = useContext(AgeRangeContext)

    const [user, setUser] = useState({})
    const [ageRange, setAgeRange] = useState({})

    const userId = parseInt(localStorage.getItem("game_player"))

    useEffect(() => {
        getUsers()
            .then(getAgeRanges)
    }, [])

    useEffect(() => {
        const user = users.find(u => u.id === parseInt(props.match.params.userId)) || {}
        setUser(user)
    }, [users])

    useEffect(() => {
        const ageRange = ageRanges.find(aR => aR.id === user.ageRangeId) || {}
        setAgeRange(ageRange)
    }, [ageRanges])

    // Render logic on 

    const verifyUser = (userId) => {
        if (userId === user.id)
            return Boolean(true);
    }

    return (
        <article className="usersWindow">
            <section className="userDetail">
                <h2>User Detail</h2>
                <img src={user.picUrl} style={{ width: '150px' }} ></img>
                <h3>Username: {user.username}</h3>
                <div>E-mail: {user.email}</div>
                <div>Location Preference: {user.locationPreference}</div>
                <div>Age Range: {ageRange.type}</div>
                <h3>About me: {user.shortBio}</h3>
                {verifyUser(userId) ? <button className="editProfile" onClick={() => props.history.push(`/users/edit/${user.id}`)}>Edit Profile</button> : ""}
            </section >
        </article>
    )
}