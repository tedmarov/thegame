import React, { useRef } from "react"
import { Link } from "react-router-dom";
import "./Login.css"


export const Login = props => {
    const username = useRef()
    const password = useRef()
    const existDialog = useRef()
    const passwordDialog = useRef()

    const existingUserCheck = () => {
        return fetch(`http://localhost:8088/users?username=${username.current.value}`)
            .then(_ => _.json())
            .then(user => user.length ? user[0] : false)
    }

    const handleLogin = (e) => {
        e.preventDefault()

        existingUserCheck()
            .then(exists => {
                if (exists && exists.password === password.current.value) {
                    // The user id is saved under the key game_player in local Storage. Change below if needed!
                    localStorage.setItem("game_player", exists.id)
                    props.history.push("/")
                } else if (exists && exists.password !== password.current.value) {
                    passwordDialog.current.showModal()
                } else if (!exists) {
                    existDialog.current.showModal()
                }
            })
    }

    return (
        <main className="container--main">
            <dialog className="dialog dialog--auth" ref={existDialog}>
                <div>User does not exist</div>
                <button className="button--close" onClick={e => existDialog.current.close()}>Close</button>
            </dialog>
            <dialog className="dialog dialog--password" ref={passwordDialog}>
                <div>Password does not match</div>
                <button className="button--close" onClick={e => passwordDialog.current.close()}>Close</button>
            </dialog>
            <section>
                <form className="form--main" onSubmit={handleLogin}>
                    <h2>Please sign in</h2>
                    <fieldset>
                        <label htmlFor="inputUsername"> Username </label>
                        <input ref={username} type="Username"
                            id="username"
                            className="form-control"
                            placeholder="Username"
                            required autoFocus />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="inputPassword"> Password </label>
                        <input ref={password} type="password"
                            id="password"
                            className="form-control"
                            placeholder="Password"
                            required />
                    </fieldset>
                </form>
                <form onSubmit={handleLogin}>
                    <button type="submit">Sign in</button>
                </form>
                Not a member yet? <Link to="/register">Register here</Link>
            </section>
        </main>
    )
}

