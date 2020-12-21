import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"
import home from "../nav/home.png"
import menu from "../nav/menu.png"
import logout from "../nav/logout.png"

//I want to replace the words with icon links.

export const NavBar = (props) => {

    const handleLogout = (e) => {
        e.preventDefault()
        localStorage.clear()
        props.history.push("/login")
    }

    return (
        <nav className="navbar">
            <li className="navbar__item active">
                <Link style={{ textDecoration: 'none' }} className="navbar__link" to="/"><img src={home}></img></Link>
            </li>
            <li className="navbar__item">
                <Link style={{ textDecoration: 'none' }} className="navbar__link" to="/events"><img src={menu}></img></Link>
            </li>
            <li className="navbar__item" >
                <Link style={{ textDecoration: 'none' }} className="navbar__link" to="/" onClick={(e) => { if (window.confirm('Are you sure you wish to log out?')) { handleLogout(e) } }}><img src={logout}></img></Link>
            </li>
        </nav >
    )
}