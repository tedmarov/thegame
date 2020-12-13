import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import { TheGame } from "./components/TheGame.js"
import logoPath from "./components/auth/logo.jpg"
import "./index.css"

ReactDOM.render(
  <React.StrictMode>
    <img src={logoPath} alt="Hi Brenda" />
    <Router>
      <TheGame />
    </Router>
    <div>
      <footer className="disclaimer">
        <address>
          <div className="textContainer">Anytime you play, think of The Game</div>
          <div>Copyright 2020. Plz no sue.</div>
          <div>Visit us at our campus! 301 Plus Park Blvd #300</div>
        </address>
      </footer>
    </div>

  </React.StrictMode>,
  document.getElementById('root')
);

