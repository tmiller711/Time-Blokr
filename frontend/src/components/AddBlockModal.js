import React from "react"
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Slider from '@mui/material/Slider';

const AddBlockModal = ({ show, handleClose, handleSave }) => {
    const [topic, setTopic] = useState('')
    const [startTime, setStartTime] = useState('')
    const [length, setLength] = useState('1')
    const [validated, setValidated] = useState(false)
    const marks = [
        {
            value: 1,
            label: "1 Hr"
        },
        {
            value: 2,
            label: "2 Hrs"
        },
        {
            value: 3,
            label: "3 Hrs"
        },
        {
            value: 4,
            label: "4 Hrs"
        }
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

    const handleSubmit = () => {
        console.log(length)
        if (topic.length > 0 && startTime.length > 0) {
            handleSave(topic, startTime, length)
        }
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Add Block Form</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated}>
                        <Form.Group className="mb-3" controlId="validationCustom01">
                        <Form.Label>Topic</Form.Label>
                        <Form.Control
                            type="topic"
                            placeholder=""
                            autoFocus
                            required
                            onChange={(e) => setTopic(e.target.value)}
                        />
                        <Form.Control.Feedback type="invalid">
                        Please input a valid topic name
                        </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Start Time</Form.Label>
                        <Form.Control
                            type="time"
                            placeholder=""
                            autoFocus
                            required
                            onChange={(e) => setStartTime(e.target.value)}
                        />
                        <Form.Control.Feedback type="invalid">
                        Please select a valid time
                        </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Label>Length</Form.Label>
                        <Slider
                            aria-label="Length"
                            defaultValue={1}
                            valueLabelDisplay={marks}
                            step={0.5}
                            min={1}
                            max={4}
                            marks={marks}
                            onChange={(e) => setLength(e.target.value)}
                        />
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={onSubmit}>
                    Add Block
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AddBlockModal