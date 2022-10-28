import React from "react"
import {useState} from 'react'
import {Calendar as ReactCalendar} from 'react-calendar'

const Calendar = (props) => {
    const [date, setDate] = useState(new Date())

    return (
        <div className="calendar-container">
           <ReactCalendar onChange={setDate} value={date} /> 
        </div>
    )
}

export default Calendar