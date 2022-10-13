import React, { useEffect } from "react"
import { useState, useCallback } from "react"
import { FaTimes } from 'react-icons/fa'
import Form from 'react-bootstrap/Form';

const Block = ({ block, onTopicChange, onDelete }) => {

    const handleOnChange = useCallback((event) => {
        onTopicChange(block.id, event.target.value);
    }, [block.id]);

    return (
        <Form.Group className="mb-3" controlId="validationCustom01">
            <div class="input-group mb-3">
                <Form.Control
                    className="block"
                    type="topic"
                    placeholder=""
                    autoFocus
                    required
                    value={block.topic}
                    onChange={handleOnChange}
                    />
                    <div class="input-group-append">
                    <div class="input-group-text">
                        <FaTimes className="delete-btn" onClick={() => onDelete(block.id)} />
                    </div>
                </div>
            </div>
            <h4>{block.start_time} - {block.end_time}</h4>
            <hr className="dashed"/>
        </Form.Group>
    )
}

export default Block