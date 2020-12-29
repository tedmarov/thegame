import React from "react"
import { Link } from "react-router-dom"
import { Button, ClickAwayListener, Grow, Paper, Popper, MenuItem, MenuList } from "../../../node_modules/@material-ui/core";
// import ClickAwayListener from "../../../node_modules/@material-ui/core";
// import Grow from "../../../node_modules/@material-ui/core";
// import Paper from "../../../node_modules/@material-ui/core";
// import Popper from "../../../node_modules/@material-ui/core";
// import MenuItem from "../../../node_modules/@material-ui/core";
// import MenuList from "../../../node_modules/@material-ui/core";
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
        <nav className="navbar" container>
            <dd className="navbar__item active">
                <Link style={{ textDecoration: 'none' }} className="navbar__link" to="/"><img src={home} alt="Shave and" /></Link>
            </dd>
            <Button
                className="navbar__item"
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}>
                <img src={menu} />
            </Button>
            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList
                                    className="menu__list"
                                    autoFocusItem={open}
                                    id="menu-list-grow"
                                    onKeyDown={handleListKeyDown}>
                                    <MenuItem><Link
                                        className="menu__link"
                                        to="/events/create"
                                        style={{ textDecoration: 'none', textAlign: 'center' }}>Create Event</Link></MenuItem>
                                    <MenuItem><Link
                                        className="menu__link"
                                        to="/games/create"
                                        style={{ textDecoration: 'none', textAlign: 'center' }}>Add Game</Link></MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
            <dd className="navbar__item">
                <Link style={{ textDecoration: 'none' }} className="navbar__link" to="/" onClick={(e) => { if (window.confirm('Are you sure you wish to log out?')) { handleLogout(e) } }}><img src={logout} alt="Two Bits" /></Link>
            </dd>
        </nav >
    )
}