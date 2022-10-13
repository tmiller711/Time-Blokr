import React from "react"
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const AddBlockModal = ({ show, handleClose, handleSave }) => {
    const [topic, setTopic] = useState('')
    const [startTime, setStartTime] = useState('')
    const [length, setLength] = useState('1')

    const onSubmit = () => {
        handleSave(topic, startTime, length)
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Add Block Form</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Topic</Form.Label>
                        <Form.Control
                            type="topic"
                            placeholder=""
                            autoFocus
                            onChange={(e) => setTopic(e.target.value)}
                        />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Start Time</Form.Label>
                        <Form.Control
                            type="time"
                            placeholder=""
                            autoFocus
                            onChange={(e) => setStartTime(e.target.value)}
                        />
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
                <Button variant="primary" onClick={() => onSubmit()}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AddBlockModal