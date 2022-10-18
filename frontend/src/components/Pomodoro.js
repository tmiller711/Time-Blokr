import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import PomodoroModal from './PomodoroModal';

const Pomodoro = ({getCookie}) => {
    const [workLength, setWorkLength] = useState('')
    const [breakLength, setBreakLength] = useState('')
    const [show, setShow] = useState(false);
    const [workState, setWorkState] = useState('work')
    const [timer, setTimer] = useState('')
    const [isTimer, setIsTimer] = useState(false)

    useEffect(() => {
        const getPomodoroSettings = async () => {
            const pomodoroSettings = await fetchPomodoroSettings()
            setWorkLength(pomodoroSettings.work_length)
            setTimer(pomodoroSettings.work_length + ":00")
            setBreakLength(pomodoroSettings.break_length)
        }

        getPomodoroSettings()
    }, [workLength])

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

    function pomodoro() {
        if (workState == 'work' && workLength != '') {
            setIsTimer(true)
            let secondsLeft = workLength*60
            startWork(secondsLeft)
        } else if (workState == 'break' && breakLength != '0') {
            setIsTimer(true)
            let secondsLeft = breakLength*60
            startBreak(secondsLeft)
        }
    }

    const startWork = (secondsLeft) => {
        let loop = setInterval(() => {
            secondsLeft -= 1
            setTimer(calcMinsSecs(secondsLeft))
            if (secondsLeft == 0) {
                setTimer(calcMinsSecs(breakLength*60))
                setWorkState('break')
                setIsTimer(false)
                clearInterval(loop)
            }
        }, 1000)
    }

    const startBreak = (secondsLeft) => {
        let loop = setInterval(() => {
            secondsLeft -= 1
            setTimer(calcMinsSecs(secondsLeft))
            if (secondsLeft == 0) {
                setTimer(calcMinsSecs(workLength*60))
                setWorkState('work')
                setIsTimer(false)
                clearInterval(loop)
            }
        }, 1000)
    }
    

    return (
        <>
            <div className="pomodoro">
                <p className="work-state">{workState}</p>
                <p className='time-left'>{timer}</p>
            </div>
            {isTimer == false ? <Button variant="primary" name="pomodoro-start" onClick={pomodoro}>Start</Button> : 
                            <Button variant="primary" name="pomodoro-start">Pause</Button>}

            <Button variant="primary" name="pomodoro-settings" onClick={handleShow}>Settings</Button>

            {show === true ? <PomodoroModal show={show} handleClose={handleClose} handleSave={onSave} 
                                _workLength={workLength} _breakLength={breakLength} /> : null}
        </>
    )
}

export default Pomodoro