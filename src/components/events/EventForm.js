import React, { useContext, useRef, useEffect } from "react"
import { EventContext } from "./EventProvider.js"
import { GameContext } from "../games/GameProvider.js"
import { TypesContext } from "../games/TypesProvider.js"
import "./Events.css"

export const EventForm = (props) => {
    const { addEvent } = useContext(EventContext)
    const { locations, getLocations } = useContext(LocationContext)

    /*
    Create references that can be attached to the input
    fields in the form. This will allow you to get the
    value of the input fields later when the user clicks
    the save button.
    
    No more `document.querySelector()` in React.
    */
    const name = useRef(null)
    const location = useRef(null)
    const manager = useRef(false)
    const status = useRef(null)
    const pay = useRef(null)

    /*
        Get Products state and location state on initialization.
    */
    useEffect(() => {
        getLocations()
    }, [])

    const constructNewEmployee = () => {
        /*
            The `location` and `products` variables below are
            the references attached to the input fields. You
            can't just ask for the `.value` property directly,
            but rather `.current.value` now in React.
        */
        const locationId = parseInt(location.current.value)
        const hourlyRate = pay.current.value //May need to adjust to decimal places
        const isManager = manager.current.checked
        const isFullTime = status.current.checked

        if (locationId === 0) {
            window.alert("Please select a location")
        } else {
            addEmployee({
                name: name.current.value,
                locationId,
                isManager,
                isFullTime,
                hourlyRate
            })
                .then(() => props.history.push("/employees"))
        }
    }

    return (
        <form className="employeeForm">
            <h2 className="employeeForm__title">New Employee</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="employeeName">Employee name: </label>
                    <input type="text" id="employeeName" ref={name} required autoFocus className="form-control" placeholder="Employee name" />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="location">Assign to location: </label>
                    <select defaultValue="" name="location" ref={location} id="employeeLocation" className="form-control" >
                        <option value="0">Select a location</option>
                        {locations.map(e => (
                            <option key={e.id} value={e.id}>
                                {e.address}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="manager">Is Manager? </label>
                    <input type="checkbox" ref={manager} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="status">Is FullTime? </label>
                    <input type="checkbox" ref={status} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="hourlyRate">Hourly rate: </label>
                    <input type="number" required name="hourlyRate" ref={pay} min="0" step=".01" />
                </div>
            </fieldset>
            <button type="submit"
                onClick={evt => {
                    evt.preventDefault() // Prevent browser from submitting the form
                    constructNewEmployee()
                }}
                className="btn btn-primary">
                Save Employee
            </button>
        </form>
    )
}
// Console log the checkboxes for values