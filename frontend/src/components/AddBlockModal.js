import React from "react"
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const AddBlockModal = ({ show, handleClose, handleSave }) => {
    const [topic, setTopic] = useState('')
    const [startTime, setStartTime] = useState('')
    const [length, setLength] = useState('1')
    const [validated, setValidated] = useState(false)

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
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Length</Form.Label>
                            <Form.Select aria-label="Default select example" onChange={(e) => setLength(e.target.value)}>
                            <option value="1">1 Hr</option>
                            <option value="2">2 Hrs</option>
                            <option value="3">3 Hrs</option>
                            </Form.Select>
                        </Form.Group>
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

export default AddBlockModal