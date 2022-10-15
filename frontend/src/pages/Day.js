import React from "react";
import { useState, useEffect } from "react";
import Blocks from "../components/Blocks"
import ProgressBar from 'react-bootstrap/ProgressBar';
import "../css/day.css"

const Day = ({ getCookie, getCurTime }) => {
    const [wakeUpTime, setWakeUpTime] = useState('')
    const [bedtime, setBedtime] = useState('')
    const [currentBlock, setCurBlock] = useState('')
    const [percentDone, setPercentDone] = useState()

    useEffect(() => {
        const getTimes = async () => {
            const accountTimes = await fetchTimes()
            setWakeUpTime(accountTimes.wake_up_time_display)
            setBedtime(accountTimes.bedtime_display)
        }

        getTimes()
    }, [])

    const fetchTimes = async () => {
        const res = await fetch('/api/account/settings')
        const data = await res.json()

        return data
    }

    const curBlock = (block, _percentDone) => {
        setCurBlock(block)
        setPercentDone(_percentDone)
    }

    const renderCurTask = () => {
        if (curBlock == '') {
            return <h1>This is a test</h1>
        }
        return (
            <>
            <h1>Current Task: {currentBlock.topic}</h1>
            <h3>{currentBlock.start_time} - {currentBlock.end_time} </h3>
            <ProgressBar className="progress" now={percentDone} />
            </>
        )
    }

    return (
        <div className="day-view">
            <div className="time-blocking">
                <div className="wake-up-time">
                    <h2>Wake up: {wakeUpTime}</h2>
                </div>
                <div className="blocks">
                    <Blocks getCookie={getCookie} getCurTime={getCurTime} curBlock={curBlock} />
                </div>
                
                <div className="bedtime">
                    <h2>Sleep: {bedtime}</h2>
                </div>
            </div>

            <hr className="seperator"></hr>

            <div className="current-task">
                {renderCurTask()}
                {/* <h1>Current Task: {currentBlock.topic}</h1>
                <h3>{currentBlock.start_time} - {currentBlock.end_time} </h3>
                <ProgressBar className="progress" now={percentDone} /> */}
            </div>
        </div>
    )
}

export default Day