import React, { useEffect } from "react"
import { useState, useCallback } from "react"
import { FaTimes } from 'react-icons/fa'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const Block = ({ block, onTopicChange, onDelete, onUpdate }) => {

    const handleOnChange = useCallback((event) => {
        onTopicChange(block.id, event.target.value);
    }, [block.id]);

    const handleOnBlur = (e) => {
        // if it looses focus update the blocks
        onUpdate(e)
    }

    return (
        <Form.Group className="mb-3" controlId="validationCustom01">
            <div class="input-group mb-3">
                <Form.Control
                    className="block"
                    type="text"
                    placeholder=""
                    autoFocus
                    required
                    value={block.topic}
                    onBlur={handleOnBlur}
                    onChange={handleOnChange}
                    />
                    <InputGroup.Text onClick={() => onDelete(block.id)}>X</InputGroup.Text>
            </div>
            <h4>{block.start_time} - {block.end_time}</h4>
            <hr className="dashed"/>
        </Form.Group>
    )
}

export default Block