import React, { useEffect } from "react"
import { useState, useCallback } from "react"
import { FaTimes } from 'react-icons/fa'

const Block = ({ block, onTopicChange, onDelete }) => {

    const handleOnChange = useCallback((event) => {
        onTopicChange(block.id, event.target.value);
    }, [block.id]);

    return (
        <div className="block">
            <input type="text" name="topic" className="block-topic" value={block.topic} onChange={handleOnChange}></input>
            <FaTimes className="delete-btn" onClick={() => onDelete(block.id)} />
            <h4>{block.start_time} - {block.end_time}</h4>
            <hr class="dashed" />
        </div>
    )
}

export default Block