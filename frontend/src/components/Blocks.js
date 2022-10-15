import React from "react";
import { useState, useEffect, useCallback } from "react";
import Block from './Block'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "../css/blocks.css"
import Form from 'react-bootstrap/Form';
import AddBlockModal from "./AddBlockModal";

const Blocks = ({ getCookie, getCurTime, curBlock }) => {
    const [blocks, setBlocks] = useState([])
    const [show, setShow] = useState(false);

    useEffect(() => {
        const getBlocks = async () => {
            const blocksFromServer = await fetchBlocks()
            setBlocks(blocksFromServer)
        };

        getBlocks()
        // checkTimes()
    }, []);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const checkTimes = (blocks) => {
        // converts time into strings that are easily comparable
        const convert_time = (time) => {
            let times = time.split(":")
            let hour = times[0]
            let minutes = times[1].substr(0, 2)
            let amPM = times[1].substr(2)
            
            amPM == 'PM' && hour != 12 ? hour = +hour+12 : null
            amPM == 'AM' && hour == 12 ? hour = +hour-12 : null
            return (hour + minutes)
        }
        let curTime = getCurTime()
        curTime = convert_time(curTime)

        for (let i = 0; i < blocks.length; i++) {
            let startTime = convert_time(blocks[i].start_time)
            let endTime = convert_time(blocks[i].end_time)

            if (startTime <= curTime && endTime >= curTime) {
                let percentDone = ((curTime-startTime)/(endTime - startTime))*100
                curBlock(blocks[i], percentDone)
            } else {
                curBlock('')
            }
        }

        setTimeout(() => {
            checkTimes(blocks)
        }, 30000)
    }

    // function that calls two functions
    const onSave = (topic, startTime, length) => {
        handleClose()
        addBlock(topic, startTime, length)
    }

    const fetchBlocks = async () => {
        const res = await fetch("/api/getblocks")
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
    }

    const addBlock = async (topic, startTime, length) => {
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
                length: length
            })
        })

        const data = await res.json()

        setBlocks([...blocks, data])
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