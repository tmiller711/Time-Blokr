import React, { useEffect } from "react"
import { useState, useCallback } from "react"

const Block = ({ block, onTopicChange }) => {
    
    const handleOnChange = useCallback((event) => {
        onTopicChange(block.id, event.target.value);
    }, [block.id]);

    return (
        <div className="block">
            <input type="text" name="topic" value={block.topic} onChange={handleOnChange}></input>
            <h4>{block.start_time} - {block.end_time}</h4>
            <hr class="dashed" />
        </div>
    )
}

export default Block