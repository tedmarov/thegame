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
        <nav className="navbar">
            <li className="navbar__item active">
                <Link style={{ textDecoration: 'none' }} className="navbar__link" to="/">Dashboard</Link>
            </li>
            <li className="navbar__item">
                <Link style={{ textDecoration: 'none' }} className="navbar__link" to="/events">Events</Link>
            </li>
            <li className="navbar__item" >
                <Link style={{ textDecoration: 'none' }} className="navbar__link" to="/" onClick={(e) => { if (window.confirm('Are you sure you wish to log out?')) { handleLogout(e) } }}>Logout</Link>
            </li>
        </nav>
    )
}