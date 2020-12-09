import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import { TheGame } from "./components/TheGame.js"
import "./index.css"

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <TheGame />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

