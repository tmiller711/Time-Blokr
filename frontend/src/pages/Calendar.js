import React from "react"
import {useState, useRef} from 'react'
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { Calendar as BigCalendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Form from "react-bootstrap/Form";

const locales = {
    "en-US": require("date-fns/locale/en-US")
}
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales
})
const events = [
    {
        title: "Big Metting",
        start: new Date(2022,9, 28),
        end: new Date(2022, 9, 28)
    },
    {
        title: "Vacation",
        start: new Date(2022,9,28),
        end: new Date(2022, 9, 28)
    },
    {
        title: "Conference",
        start: new Date(2022,9,0),
        end: new Date(2022, 9,0)
    }
]

const Calendar = (props) => {
    const [newEvent, setNewEvent] = useState({title: "", start: "", end: ""})
    const [allEvents, setAllEvents] = useState(events)

    const handleAddEvent = () => {
        setAllEvents([...allEvents, newEvent])
    }

    const setStart = (start) => {
        setNewEvent({...newEvent, start})
    }

    const setEnd = (end) => {
        setNewEvent({...newEvent, end})
    }

    return (
        <div className="calendar-container">
            <h1>Calendar</h1>
            <h2>Add new event</h2>
            <div>
                <input type="text" placeholder="Add Title" style={{width: "20%", marginRight: "10px"}}
                    value={newEvent.title} onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                />
                <Form.Control type="date" name='date' placeholderText="Start Date" value={newEvent.start} 
                onChange={(start) => setStart(start.target.value)} style={{marginRight: "10px"}} />
                <Form.Control type="date" name='date' placeholderText="End Date" value={newEvent.end} 
                onChange={(end) => setEnd(end.target.value)} />
                <button style={{marginTop: "10px"}} onClick={handleAddEvent}>Add Event</button>
            </div>
            <BigCalendar localizer={localizer} events={allEvents} 
            startAccessor="start" endAccessor="end" style={{height: "500px", margin: "50px"}} />
        </div>
    )
}

export default Calendar