import React, { useContext, useRef, useEffect } from "react"
import { AgeRangeContext } from "./AgeRangeProvider.js"
import { UserContext } from "../users/UserProvider.js"
import "./Login.css"

export const Register = (props) => {
    const { users, getUsers } = useContext(UserContext)
    const { ageRanges, getAgeRanges } = useContext(AgeRangeContext)

    const picUrl = useRef()
    const username = useRef()
    const email = useRef()
    const password = useRef()
    const verifyPassword = useRef()
    const locationPreference = useRef()
    const ageRangeId = useRef()
    const shortBio = useRef()
    const consent = useRef()
    const passwordDialog = useRef()
    const conflictDialog = useRef()

    useEffect(() => {
        getAgeRanges()
    }, [])

    const existingUserCheck = () => {
        return fetch(`http://localhost:8088/users?username=${username.current.value}`)
            .then(_ => _.json())
            .then(user => !!user.length)
    }

    const handleRegister = (e) => {
        e.preventDefault()

        if (password.current.value === verifyPassword.current.value) {
            existingUserCheck()
                .then((userExists) => {
                    if (!userExists) {
                        fetch("http://localhost:8088/users", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                picUrl: picUrl.current.value,
                                username: username.current.value,
                                password: password.current.value,
                                email: email.current.value,
                                locationPreference: locationPreference.current.value,
                                ageRangeId: parseInt(ageRangeId.current.value),
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
                    else {
                        conflictDialog.current.showModal()
                    }
                })
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
                    <h2>Registration</h2>
                    <label htmlFor="selectPic"> Upload Pic </label>
                    <input ref={picUrl} type="file" accept="image/png, image/jpg" name="picUrl" className="form-control" placeholder="" />
                    <fieldset>
                        <label htmlFor="inputUsername"> Username </label>
                        <input ref={username} type="Username"
                            name="username"
                            className="form-control"
                            placeholder="Username"
                            required />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="inputEmail"> Email </label>
                        <input ref={email} type="email" name="email" className="form-control" placeholder="Email address" required />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="inputPassword"> Password </label>
                        <input ref={password} type="password" name="password" className="form-control" placeholder="Password" required />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="verifyPassword"> Verify Password </label>
                        <input ref={verifyPassword} type="password" name="verifyPassword" className="form-control" placeholder="Verify password" required />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="locationPreference"> Location Preference </label>
                        <input ref={locationPreference} type="text" name="locationPreference" className="form-control" placeholder="Enter location" required />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="ageRange"> Choose your Age Range </label>
                        <select defaultValue="" name="ageRange" ref={ageRangeId} id="ageRange" className="form-control" >
                            <option value="0"> Age Range </option>
                            {ageRanges.map(aR => (
                                <option key={aR.id} value={aR.id}>
                                    {aR.type}
                                </option>
                            ))}
                        </select>
                    </fieldset>
                    <fieldset>
                        <label htmlFor="detail"> Short Bio </label>
                        <textarea ref={shortBio} type="text" rows="5" cols="20" name="detail" className="form-control" placeholder="Enter detail here" required />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="status"> By checking the box, I confirm that I am 18+ or am a parent/guardian. </label>
                        <input type="checkbox"
                            ref={consent}
                            className="form-Control"
                            required></input>
                    </fieldset>
                </form>
                <form onSubmit={handleRegister}>
                    <button type="submit">Register </button>
                </form>
            </section>
        </main>
    )
}

