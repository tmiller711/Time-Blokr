import React from "react"
import {useState, useEffect} from 'react'
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { Calendar as BigCalendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

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

const Calendar = ({ getCookie }) => {
    const [newEvent, setNewEvent] = useState({title: "", start: "", end: ""})
    const [allEvents, setAllEvents] = useState([])
    const [show, setShow] = useState(false);

    useEffect(() => {
        const getEvents = async () => {
            const eventsFromServer = await fetchEvents()
            setAllEvents(eventsFromServer)
        };

        getEvents()
    }, [])

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const fetchEvents = async () => {
        // retrieve events from backend
        const res = await fetch("/api/events")
        const data = await res.json()

        return data
    }

    const handleAddEvent = async () => {
        // send a post request to backend with new event
        const csrftoken = getCookie('csrftoken');
        const res = await fetch('/api/events', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({
                title: newEvent.title,
                start: newEvent.start,
                end: newEvent.end
            })
        })
        if (res.ok) {
            const data = await res.json()
            console.log(data)
            setAllEvents([...allEvents, data])
        } else {
            alert("Error adding event")
        }

        setShow(false)
    }

    const deleteEvent = async (event) => {
        let id = event.id
        const csrftoken = getCookie('csrftoken');
        const res = await fetch(`/api/deleteevent/${id}`, {
            method: 'DELETE',
            headers: {
                'X-CSRFToken': csrftoken
            }
        })
        if (res.ok) {
            setAllEvents(allEvents.filter((event) => event.id !== id))
        } else {
            alert("Error deleting event")
        }
    }

    return (
        <div className="calendar-container">
            <Button variant="primary" name="add-event" onClick={handleShow}>Add Event</Button>
            <BigCalendar localizer={localizer} events={allEvents} onDoubleClickEvent={deleteEvent}
            startAccessor="start" endAccessor="end" style={{height: "87vh", margin: "50px"}} />
            {console.log(allEvents)}

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Add Block Form</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="topic"
                            placeholder="Add Title"
                            autoFocus
                            required
                            onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                        />
                        <Form.Label>Start Date</Form.Label>
                        <Form.Control type="date" name='date' placeholderText="Start Date" value={newEvent.start} 
                        onChange={(start) => setNewEvent({...newEvent, start: start.target.value})} style={{marginRight: "10px"}} />
                        <Form.Label>End Date</Form.Label>
                        <Form.Control type="date" name='date' placeholderText="End Date" value={newEvent.end} 
                        onChange={(end) => setNewEvent({...newEvent, end: end.target.value})} />
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleAddEvent}>
                    Save
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Calendar