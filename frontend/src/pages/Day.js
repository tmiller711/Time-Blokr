import React from "react";
import { useState, useEffect } from "react";
import Blocks from "../components/Blocks"
import ProgressBar from 'react-bootstrap/ProgressBar';
import Pomodoro from "../components/Pomodoro"
import "../css/day.css"
import Form from "react-bootstrap/Form";

const Day = ({ getCookie, getCurTime }) => {
    const [wakeUpTime, setWakeUpTime] = useState('')
    const [bedtime, setBedtime] = useState('')
    const [currentBlock, setCurBlock] = useState('')
    const [percentDone, setPercentDone] = useState()
    const [date, setDate] = useState('')

    useEffect(() => {
        const getTimes = async () => {
            const accountTimes = await fetchTimes()
            setWakeUpTime(accountTimes.wake_up_time_display)
            setBedtime(accountTimes.bedtime_display)
        }
        const currentDate = () => {
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();
            setDate(`${yyyy}-${mm}-${dd}`)
        }

        currentDate()
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
        if (currentBlock == '') {
            return <h1>No Current Task</h1>
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
                <Form.Control type="date" name='date_of_birth' value={date} onChange={(e) => setDate(e.target.value)}/>
                    <h2>Wake up: {wakeUpTime}</h2>
                </div>
                <div className="blocks">
                    <Blocks getCookie={getCookie} getCurTime={getCurTime} curBlock={curBlock} date={date} />
                </div>
                
                <div className="bedtime">
                    <h2>Sleep: {bedtime}</h2>
                </div>
            </div>

            <hr className="seperator"></hr>

            <div className="task">
                {renderCurTask()}
                <div className="pomodoro">
                    <Pomodoro getCookie={getCookie}/>
                </div>
            </div>

        </div>
    )
}

export default Day