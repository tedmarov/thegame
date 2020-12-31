import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import { TheGame } from "./components/TheGame.js"
import logo from "./components/auth/logo.png"
import "./index.css"

ReactDOM.render(
  <React.StrictMode>
    <div className="imageDiv">
      <img className="imageDiv__logo" src={logo} alt="Hi Brenda" />
      <h2 className="imageDiv__text">The Game</h2>
    </div>
    <Router>
      <TheGame />
    </Router>
    <footer className="disclaimer">
      <address>
        <div>Anytime you play, think of The Game</div>
        <div>Copyright 2020. Plz no sue.</div>
        <div>Visit us at our campus! 301 Plus Park Blvd #300</div>
      </address>
    </footer>
  </React.StrictMode>,
  document.getElementById('root')
);

