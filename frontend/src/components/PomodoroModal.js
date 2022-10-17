import React from "react"
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Slider from '@mui/material/Slider';

const PomodoroModal = ({ show, handleClose, handleSave }) => {
    const [workLength, setWorkLength] = useState('')
    const [breakLength, setBreakLength] = useState('')
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
        console.log('test')
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
                        <Form.Label>Work Length</Form.Label>
                        <Form.Control
                            type="text"
                            required
                            onChange={(e) => setWorkLength(e.target.value)}
                        />
                        <Form.Control.Feedback type="invalid">
                        Please input a valid work length
                        </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="validationCustom01">
                        <Form.Label>Break Length</Form.Label>
                        <Form.Control
                            type="text"
                            required
                            onChange={(e) => setBreakLength(e.target.value)}
                        />
                        <Form.Control.Feedback type="invalid">
                        Please input a valid break length
                        </Form.Control.Feedback>
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

export default PomodoroModal