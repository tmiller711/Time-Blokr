import React from "react";
import { useState, useEffect, useCallback } from "react";
import Block from './Block'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import "../css/blocks.css"
import Form from 'react-bootstrap/Form';
import AddBlockModal from "./AddBlockModal";

const Blocks = ({ getCookie, getCurTime, curBlock, date }) => {
    const [blocks, setBlocks] = useState([])
    const [show, setShow] = useState(false);

    useEffect(() => {
        const getBlocks = async () => {
            const blocksFromServer = await fetchBlocks(date)
            setBlocks(blocksFromServer)
        };

        getBlocks()
        // checkTimes()
    }, [date]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const converTime = (time) => {
        let times = time.split(":")
        let hour = times[0]
        let minutes = times[1].substr(0, 2)
        let amPM = times[1].substr(2)
        
        amPM == 'PM' && hour != 12 ? hour = +hour+12 : null
        amPM == 'AM' && hour == 12 ? hour = +hour-12 : null
        return (hour + minutes)
    }
    
    const secondsDiff = (time1, time2) => {
        let hours1 = time1.slice(0, -2)
        let minutes1 = time1.slice(-2)

        let hours2 = time2.slice(0, -2)
        let minutes2 = time2.slice(-2)
        
        var date1 = new Date(2000, 0, 1,  hours1, minutes1); // 9:00 AM
        var date2 = new Date(2000, 0, 1, hours2, minutes2); // 5:00 PM
        if (date2 < date1) {
            date2.setDate(date2.getDate() + 1);
        }

        return date2 - date1
    }

    const checkTimes = (blocks) => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        let _today = (`${yyyy}-${mm}-${dd}`)
        // converts time into strings that are easily comparable

        let curTime = getCurTime()
        curTime = converTime(curTime)

        for (let i = 0; i < blocks.length; i++) {
            let startTime = converTime(blocks[i].start_time)
            let endTime = converTime(blocks[i].end_time)

            if (startTime <= curTime && endTime >= curTime && date==_today) {
                let totalSecs = secondsDiff(startTime, endTime)
                let secondsLeft = secondsDiff(startTime, curTime)
                let percentDone = (secondsLeft/totalSecs)*100
                console.log(percentDone)

                curBlock(blocks[i], percentDone)
                break
            } else {
                curBlock('')
            }
        }

        setTimeout(() => {
            checkTimes(blocks)
        }, 15000)
    }

    // function that calls two functions
    const onSave = (topic, startTime, length) => {
        handleClose()
        addBlock(topic, startTime, length)
    }

    const fetchBlocks = async (date) => {
        const csrftoken = getCookie('csrftoken');
        const res = await fetch("/api/getblocks", {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
                'X-CSRFToken': csrftoken
            },
            body: JSON.stringify({
                date: date
            })
        })
        const data = await res.json()

        return data
    }

    const handleTopicChange = useCallback((blockId, newTopic) => {
        const updatedBlocks = blocks.map((block) => {
            if (block.id === blockId) {
                block.topic = newTopic;
            }

            return block;
        });
      
        setBlocks(updatedBlocks);
    }, [blocks]);

    const updateBlocks = async (e) => {
        e.preventDefault()
        const csrftoken = getCookie('csrftoken');
        // make a put request to the server
        const res = await fetch('/api/updateblocks', {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            },
            body: JSON.stringify(blocks)
        })

        const data = await res.json()
    }

    const deleteBlock = async (id) => {
        // e.preventDefault()
        const csrftoken = getCookie('csrftoken');
        // make a delete request to the server
        const res = await fetch(`/api/deleteblock/${id}`, {
            method: 'DELETE',
            headers: {
                'X-CSRFToken': csrftoken
            }
        })

        // set the new blocks
        setBlocks(blocks.filter((block) => block.id !== id))
        checkTimes(blocks)
    }

    const timeToMinutes = (time) => {
        time = time.split(':')
        let hours = time[0]
        let minutes = time[1].slice(0, 2)
        let amPM = time[1].slice(-2)
        if (amPM == "PM" && hours < 12) {
            hours = parseInt(hours)+12
        }
        if (hours < 10) {
            hours = hours.replace("0", "")
        }
        // (amPM == "PM" && hours < 12) ? hours = hours+12 : null
        return (hours+minutes)
    }

    const addBlock = async (topic, startTime, length) => {
        if (blocks.length == 7) {
            alert("Too many blocks")
            return
        }

        for (let i = 0; i < blocks.length; i++) {
            if (timeToMinutes(blocks[i].start_time) < timeToMinutes(startTime) && timeToMinutes(blocks[i].end_time) > timeToMinutes(startTime)) {
                alert("Selected time is already filled")
                return
            }
        }
        // send post request to server
        const csrftoken = getCookie('csrftoken');
        const res = await fetch('/api/createblock', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({
                topic: topic,
                start_time: startTime,
                length: length,
                date: date
            })
        })
        
        // retrieve all the new blocks in order
        const getBlocks = async () => {
            const blocksFromServer = await fetchBlocks(date)
            setBlocks(blocksFromServer)
        };

        getBlocks()
    }

    return (
        <Form>
            <div className="blocks">
                {blocks.length > 0 ? checkTimes(blocks) : null}
                {blocks.length > 0 ? blocks.map((block) => (
                    <Block key={block.id} block={block} onTopicChange={handleTopicChange} onDelete={deleteBlock} onUpdate={updateBlocks} />
                )) : <h2 style={{color: 'blue'}}>No Blocks to Display</h2>}

                <Button variant="primary" name="add-block" onClick={handleShow}>Add Block</Button>

            </div>

            {show === true ? <AddBlockModal show={show} handleClose={handleClose} handleSave={onSave} /> : null}
        </Form>
    )
}

export default Blocks