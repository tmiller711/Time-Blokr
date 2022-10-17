import React from "react"
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Slider from '@mui/material/Slider';

const PomodoroModal = ({ show, handleClose, handleSave, _workLength, _breakLength }) => {
    const [validated, setValidated] = useState(false)
    const [workLength, setWorkLength] = useState('')
    const [breakLength, setBreakLength] = useState('')
    const workMarks = [{value: 30, label: "30 Min"},{value: 45,label: "45 Min"},
            {value: 60,label: "60 Min"}, {value: 75,label: "75 Min"}, {value: 90,label: "90 Min"}
    ]
    const breakMarks = [{value: 3, label: "3 Min"},{value: 5,label: "5 Min"},
            {value: 7,label: "7 Min"}
    ]

    const onSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
        handleSubmit()
    }

    const handleSubmit = (e) => {
        setValidated(true);
        handleSave(workLength, breakLength)
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Add Block Form</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated}>
                        <Form.Label>Work Length in Minutes</Form.Label>
                        <Slider
                            aria-label="Length"
                            valueLabelDisplay={workMarks}
                            marks={workMarks}
                            step={5}
                            min={25}
                            max={95}
                            defaultValue={_workLength}
                            onChange={(e) => setWorkLength(e.target.value)}
                        />
                        <Form.Control.Feedback type="invalid">
                        Please input a valid work length
                        </Form.Control.Feedback>
                        <Form.Label>Break Length in Minutes</Form.Label>
                        <Slider
                            aria-label="Length"
                            valueLabelDisplay={breakMarks}
                            marks={breakMarks}
                            step={1}
                            min={1}
                            max={10}
                            defaultValue={_breakLength}
                            onChange={(e) => setBreakLength(e.target.value)}
                        />
                        <Form.Control.Feedback type="invalid">
                        Please input a valid break length
                        </Form.Control.Feedback>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={onSubmit}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default PomodoroModal