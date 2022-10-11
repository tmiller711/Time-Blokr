import React from "react"
import { useState } from "react"

const Block = ({ block }) => {
    return (
        <div className="block">
            <h3>{block.topic}</h3>
            <h4>{block.start_time}</h4>
            <h4>{block.end_time}</h4>
            <br></br>
        </div>
    )
}

export default Block