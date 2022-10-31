import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import PomodoroModal from './PomodoroModal';
import useSound from 'use-sound'
import digitalAlarm from '../css/digital-alarm.mp3'
import Click from '../css/click.mp3'

const Pomodoro = ({getCookie}) => {
    const [workLength, setWorkLength] = useState('')
    const [breakLength, setBreakLength] = useState('')
    const [show, setShow] = useState(false);
    const [workState, setWorkState] = useState('work')
    const [timer, setTimer] = useState('')
    const [isTimer, setIsTimer] = useState(false)
    const [alarm] = useSound(digitalAlarm)
    const [click] = useSound(Click)

    useEffect(() => {
        const getPomodoroSettings = async () => {
            const pomodoroSettings = await fetchPomodoroSettings()
            setWorkLength(pomodoroSettings.work_length)
            setTimer(pomodoroSettings.work_length + ":00")
            setBreakLength(pomodoroSettings.break_length)
        }

        var loop;
        if (workState == 'work' && workLength != '' && isTimer==true) {
            let secondsLeft = toSecs(timer)
            loop = setInterval(() => {
                secondsLeft -= 1
                setTimer(calcMinsSecs(secondsLeft))
                if (secondsLeft == 0) {
                    setTimer(calcMinsSecs(breakLength*60))
                    setWorkState('break')
                    setIsTimer(false)
                    alarm()
                    alert("Work is Over")
                    clearInterval(loop)
                }
            }, 1000)
        } else if (workState == 'break' && workLength != "0" && isTimer==true) {
            let secondsLeft = breakLength*60
            loop = setInterval(() => {
                secondsLeft -= 1
                setTimer(calcMinsSecs(secondsLeft))
                if (secondsLeft == 0) {
                    setTimer(calcMinsSecs(workLength*60))
                    setWorkState('work')
                    setIsTimer(false)
                    alarm()
                    alert("Break is Over")
                    clearInterval(loop)
                }
        }, 1000)
        }

        // only run on startup
        if (timer == '') {
            getPomodoroSettings()
        }
        return(() => {
            clearInterval(loop)
            // reset the timer
        })
    }, [workLength, isTimer])

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

    const toSecs = (time) => {
        var minutes = time.split(':')[0]
        var seconds = time.split(':')[1]
        return parseInt(minutes*60)+parseInt(seconds)
    }

    const handleClick = () => {
        click()
        if (isTimer == false) {
            setIsTimer(true)
        } else {
            setIsTimer(false)
        }
    } 

    return (
        <>
            <div className="pomodoro">
                <p className="work-state">{workState}</p>
                <p className='time-left'>{timer}</p>
            </div>
            {isTimer == false ? <Button variant="primary" name="pomodoro-start" onClick={handleClick}>Start</Button> : 
                            <Button variant="primary" name="pomodoro-start" onClick={handleClick}>Pause</Button>}

            <Button variant="primary" name="pomodoro-settings" onClick={handleShow}>Settings</Button>

            {show === true ? <PomodoroModal show={show} handleClose={handleClose} handleSave={onSave} 
                                _workLength={workLength} _breakLength={breakLength} /> : null}
        </>
    )
}

export default Pomodoro