import React from "react";
import { useState } from "react";
import Blocks from "../components/Blocks"

const Day = (props) => {
    return (
        <div className="day-view">
            <div className="blocks">
                <Blocks />
            </div>
        </div>
    )
}

export default Day