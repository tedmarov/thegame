import React, { useContext, useRef, useEffect, useState } from "react"
import { UserContext } from "../users/UserProvider.js"
import { AgeRangeContext } from "./AgeRangeProvider.js"
import "./Login.css"

export const Register = (props) => {
    const { users, getUsers } = useContext(UserContext)
    const { ageRanges, getAgeRanges } = useContext(AgeRangeContext)

    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState("")

    const picUrl = useRef()
    const username = useRef()
    const email = useRef()
    const password = useRef()
    const verifyPassword = useRef()
    const locationPreference = useRef()
    const shortBio = useRef()
    const consent = useRef()
    const passwordDialog = useRef()
    const conflictDialog = useRef()

    const editMode = props.match.params.hasOwnProperty("userId")

    const handleControlledInputChange = (e) => {
        const newUser = Object.assign({}, user)
        newUser[e.target.name] = e.target.value
        setUser(newUser)
    }

    const getUserInEditMode = () => {
        if (editMode) {
            const userId = parseInt(props.match.params.userId)
            const selectedUser = users.find(u => u.id === userId) || {}
            setUser(selectedUser)
        }
    }

    useEffect(() => {
        getUsers()
        getAgeRanges()
    }, [])

    useEffect(() => {
        getUserInEditMode()
    }, [users])

    const existingUserCheck = () => {
        return fetch(`http://localhost:8088/users?username=${username.current.value}`)
            .then(_ => _.json())
            .then(user => !!user.length)
    }

    //Need to have some way to upload an image. 
    const uploadImage = async e => {
        const files = e.target.files
        const data = new FormData()
        data.append('file', files[0])
        data.append('upload_preset', 'profileImages')
        setLoading(true)

        const res = await fetch("https://api.cloudinary.com/v1_1/tedmarov/image/upload",
            {
                method: 'POST',
                body: data
            })

        const file = await res.json()

        setImage(file.secure_url)
        setLoading(false)

    }

    const handleRegister = (e) => {
        e.preventDefault()

        const ageRangeId = parseInt(user.ageRangeId)

        if (password.current.value === verifyPassword.current.value) {
            if (editMode) {
                fetch(`http://localhost:8088/users/${user.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        picUrl: image,
                        username: user.username,
                        password: user.password,
                        email: user.email,
                        locationPreference: user.locationPreference,
                        ageRangeId: ageRangeId,
                        shortBio: user.shortBio,
                        consent: Boolean(true)
                    })
                }).then(() => props.history.push("/"))
            }
            else {
                existingUserCheck()
                    .then((userExists) => {
                        if (!userExists) {
                            {
                                fetch("http://localhost:8088/users", {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify({
                                        picUrl: image,
                                        username: username.current.value,
                                        password: password.current.value,
                                        email: email.current.value,
                                        locationPreference: locationPreference.current.value,
                                        ageRangeId: ageRangeId.current.value,
                                        shortBio: shortBio.current.value,
                                        consent: Boolean(consent.current.checked)
                                    })
                                })
                                    .then(_ => _.json())
                                    .then(createdUser => {
                                        if (createdUser.hasOwnProperty("id")) {
                                            localStorage.setItem("game_player", createdUser.id)
                                            props.history.push("/")
                                        }
                                    })
                            }
                        }
                        else {
                            conflictDialog.current.showModal()
                        }
                    })
            }
        } else {
            passwordDialog.current.showModal()
        }
    }

    return (
        <main className="container--main">
            <dialog className="dialog dialog--password" ref={passwordDialog}>
                <div>Passwords do not match</div>
                <button className="button--close" onClick={e => passwordDialog.current.close()}>Close</button>
            </dialog>
            <dialog className="dialog dialog--password" ref={conflictDialog}>
                <div>Account with that username address already exists</div>
                <button className="button--close" onClick={e => conflictDialog.current.close()}>Close</button>
            </dialog>
            <section>
                <form className="form--main" onSubmit={handleRegister}>
                    <h2>{editMode ? "Update Profile" : "Registration"}</h2>
                    <fieldset>
                        <label htmlFor="selectPic"> {editMode ? "Select A New Pic or Keep Your Current Pic" : "Upload Pic"} </label>
                        <input ref={picUrl} type="file"
                            accept="image/png, image/jpg"
                            name="picUrl"
                            className="form-control"
                            onChange={handleControlledInputChange, uploadImage}
                        />
                        {
                            loading ? (
                                <h3>Loading...</h3>
                            ) : (
                                    <img src={image} style={{ width: '150px' }} />
                                )
                        }
                    </fieldset>
                    <fieldset>
                        <label htmlFor="inputUsername"> Username </label>
                        <input ref={username} type="text"
                            name="username"
                            className="form-control"
                            placeholder="Username"
                            value={user.username}
                            onChange={handleControlledInputChange}
                            required />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="inputEmail"> Email </label>
                        <input ref={email} type="email"
                            name="email"
                            className="form-control"
                            placeholder="Email address"
                            value={user.email}
                            onChange={handleControlledInputChange}
                            required />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="inputPassword"> Password </label>
                        <input ref={password} type="password"
                            name="password"
                            className="form-control"
                            placeholder="Password"
                            value={user.password}
                            onChange={handleControlledInputChange}
                            required />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="verifyPassword"> Verify Password </label>
                        <input ref={verifyPassword} type="password"
                            name="verifyPassword"
                            className="form-control"
                            placeholder="Verify password"
                            onChange={handleControlledInputChange}
                            required />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="locationPreference"> Location Preference </label>
                        <input ref={locationPreference} type="text"
                            name="locationPreference"
                            className="form-control"
                            placeholder="Enter location"
                            value={user.locationPreference}
                            onChange={handleControlledInputChange}
                            required />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="ageRange"> Choose your Age Range </label>
                        <select name="ageRangeId"
                            id="ageRangeId"
                            className="form-control"
                            value={user.ageRangeId}
                            onChange={handleControlledInputChange}>
                            <option value="0"> Age Range </option>
                            {ageRanges.map(aR => (
                                <option key={aR.id} value={aR.id}>
                                    {aR.type}
                                </option>
                            ))}
                        </select>
                    </fieldset>
                    <fieldset>
                        <label htmlFor="shortBio"> Short Bio </label>
                        <textarea
                            rows="5" cols="20"
                            name="shortBio"
                            placeholder={user.shortBio}
                            onChange={handleControlledInputChange}
                            required />
                    </fieldset>
                    {editMode ? "" : <fieldset>
                        <label htmlFor="status"> By checking the box, I confirm that I am 18+ or am a parent/guardian. </label>
                        <input type="checkbox"
                            ref={consent}
                            value={user.consent}
                            className="form-Control"
                            required></input>
                    </fieldset>}
                </form>
                <form onSubmit={handleRegister}>
                    <button type="submit">{editMode ? "Update" : "Register"} </button>
                    {editMode ? <button to="/">Cancel</button> : ""}
                </form>
            </section>
        </main>
    )
}

