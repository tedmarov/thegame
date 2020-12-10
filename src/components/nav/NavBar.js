import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"

export const NavBar = (props) => {

    const handleLogout = (e) => {
        e.preventDefault()
        localStorage.clear()
        props.history.push("/login")
    }


    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/dashboard">Dashboard</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/events">Events</Link>
            </li>
            <li className="navbar__item" >
                <Link className="navbar__link" onClick={(e) => { if (window.confirm('Are you sure you wish to log out?')) { handleLogout(e) } }}>Logout</Link>
            </li>
        </ul>
    )
}