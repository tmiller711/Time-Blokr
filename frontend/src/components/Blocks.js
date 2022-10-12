import React from "react";
import { useState, useEffect, useCallback } from "react";
import Block from './Block'

const Blocks = ({ getCookie }) => {
    const [blocks, setBlocks] = useState([])

    useEffect(() => {
        const getBlocks = async () => {
            const blocksFromServer = await fetchBlocks()
            setBlocks(blocksFromServer)
        };

        getBlocks()
    }, []);

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

    const addBlock = () => {
        console.log("add block")
    }

    return (
        <form onSubmit={updateBlocks}>
            {blocks.length > 0 ? blocks.map((block) => (
                <Block key={block.id} block={block} onTopicChange={handleTopicChange} onDelete={deleteBlock} />
            )) : <h2>No Blocks to Display</h2>}


            <input type="submit" value="update"></input>
            <button type="submit" name="add-block" onClick={addBlock}>Add Block</button>
        </form>
    )
}

export default Blocks