import React from "react";
import { useState, useEffect } from "react";
import Blocks from "../components/Blocks"

const Day = ({ getCookie }) => {
    const [wakeUpTime, setWakeUpTime] = useState('')
    const [bedtime, setBedtime] = useState('')

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

    return (
        <div className="day-view">
            <div className="wake-up-time">
                <h2>Wake up: {wakeUpTime}</h2>
            </div>
            <div className="blocks">
                <Blocks getCookie={getCookie} />
            </div>
            
            <div className="bedtime">
                <h2>Sleep: {bedtime}</h2>
            </div>
        </div>
    )
}

export default Day