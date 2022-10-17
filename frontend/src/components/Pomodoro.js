import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import PomodoroModal from './PomodoroModal';

const Pomodoro = ({getCookie}) => {
    const [workLength, setWorkLength] = useState('')
    const [breakLength, setBreakLength] = useState('')
    const [show, setShow] = useState(false);

    useEffect(() => {
        const getPomodoroSettings = async () => {
            const pomodoroSettings = await fetchPomodoroSettings()
            setWorkLength(pomodoroSettings.work_length)
            setBreakLength(pomodoroSettings.break_length)
        }

        getPomodoroSettings()
    }, [])

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const fetchPomodoroSettings = async () => {
        const res = await fetch("/api/account/pomodoro")
        const data = await res.json()

        return data
    }

    const onSave = async (_workLength, _breakLength) => {
        _workLength == "" ? _workLength = workLength : null
        _breakLength == "" ? _breakLength = breakLength : null
        const csrftoken = getCookie('csrftoken')

        const res = await fetch('/api/account/pomodoro', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({
                work_length: _workLength,
                break_length: _breakLength
            })
        })

        const data = await res.json()
        setWorkLength(data.workLength)
        setBreakLength(data.breakLength)
    }

    const calcMinsSecs = (secondsLeft) => {
        var minutes = Math.floor(secondsLeft / 60);
        var seconds = secondsLeft - minutes * 60;
        seconds < 10 ? seconds = `0${seconds}` : null

        return `${minutes}:${seconds}`
    }

    

    return (
        <>
            <div>
                <p className='time-left'></p>
            </div>
            {/* have this button pop up a modal for the settings */}
            <Button variant="primary" name="pomodoro-start">Start</Button>
            <Button variant="primary" name="pomodoro-start">Pause</Button>

            <Button variant="primary" name="pomodoro-settings" onClick={handleShow}>Settings</Button>

            {show === true ? <PomodoroModal show={show} handleClose={handleClose} handleSave={onSave} 
                                _workLength={workLength} _breakLength={breakLength} /> : null}
        </>
    )
}

export default Pomodoro