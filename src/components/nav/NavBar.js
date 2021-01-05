import React from "react"
import { Link } from "react-router-dom"
import { Button, ClickAwayListener, Popper, MenuItem, MenuList } from "../../../node_modules/@material-ui/core";
import "./NavBar.css"
import home from "../nav/home.png"
import menu from "../nav/menu.png"
import logout from "../nav/logout.png"

//I want to replace the words with icon links.

export const NavBar = (props) => {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    const handleLogout = (e) => {
        e.preventDefault()
        localStorage.clear()
        props.history.push("/login")
    }

    return (
        <nav className="navbar">
            <Link className="navbar__link" to="/"><img src={home} alt="Shave and" /></Link>
            <Button
                className="navbar__item"
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}>
                <img src={menu} alt="And a haircut" />
            </Button>
            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                        style={{ border: "1px outset #0080ff" }}
                        onClick={handleClose}
                        className="menu__list"
                        autoFocusItem={open}
                        id="menu-list-grow"
                        onKeyDown={handleListKeyDown}>
                        <MenuItem><Link
                            className="menu__link"
                            to="/events"
                            style={{ alignSelf: 'center' }}>Events</Link></MenuItem>
                        <MenuItem><Link
                            className="menu__link"
                            to="/events/create"
                            style={{ textAlign: 'center' }}>Create an Event</Link></MenuItem>
                        <MenuItem><Link
                            className="menu__link"
                            to="/games"
                            style={{ textAlign: "center" }}>Games</Link></MenuItem>
                        <MenuItem><Link
                            className="menu__link"
                            to="/games/create"
                            style={{ textAlign: 'center' }}>Add a Game</Link></MenuItem>
                        <MenuItem><Link
                            className="menu__link"
                            to="/teams"
                            style={{ textAlign: 'center' }}>Teams</Link></MenuItem>
                        <MenuItem><Link
                            className="menu__link"
                            to="/teams/create"
                            style={{ textAlign: 'center' }}>Start a Team</Link></MenuItem>
                    </MenuList>
                </ClickAwayListener>
            </Popper>
            <Link style={{ textDecoration: 'none' }} className="navbar__link" to="/" onClick={(e) => { if (window.confirm('Are you sure you wish to log out?')) { handleLogout(e) } }}><img src={logout} alt="Two Bits" /></Link>
        </nav >
    )
}