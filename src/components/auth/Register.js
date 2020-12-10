import React, { useContext, useRef, useEffect } from "react"
import { AgeRangeContext } from "./ageRangeProvider.js"
import "./Login.css"

export const Register = (props) => {
    const { ageRanges, getAgeRanges } = useContext(AgeRangeContext)

    const picUrl = useRef()
    const username = useRef()
    const email = useRef()
    const password = useRef()
    const verifyPassword = useRef()
    const locationPreference = useRef()
    const ageRangeId = useRef()
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
                                email: username.current.value,
                                password: password.current.value,
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
        <main style={{ textAlign: "center" }}>

            <dialog className="dialog dialog--password" ref={passwordDialog}>
                <div>Passwords do not match</div>
                <button className="button--close" onClick={e => passwordDialog.current.close()}>Close</button>
            </dialog>

            <dialog className="dialog dialog--password" ref={conflictDialog}>
                <div>Account with that username address already exists</div>
                <button className="button--close" onClick={e => conflictDialog.current.close()}>Close</button>
            </dialog>

            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Please register for NSS The Game</h1>
                <fieldset>
                    <label htmlFor="selectPic"> Upload Pic </label>
                    <input ref={picUrl} type="text" name="picUrl" className="form-control" placeholder="" />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputEmail"> Username </label>
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
                    <label htmlFor="ageRange"> Choose your Age Range: </label>
                    <select defaultValue="" name="ageRange" ref={ageRangeId} id="ageRange" className="form-control" >
                        <option value="0"> Select your Age Range </option>
                        {ageRanges.map(aR => (
                            <option key={aR.id} value={aR.id}>
                                {aR.ageRange}
                            </option>
                        ))}
                    </select>
                </fieldset>

                <fieldset>
                    <button type="submit"> Sign in </button>
                </fieldset>
            </form>
        </main>
    )
}

