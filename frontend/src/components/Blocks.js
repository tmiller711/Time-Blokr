import React from "react";
import { useState, useEffect } from "react";
import Block from './Block'

const Blocks = (props) => {
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

    return (
        <>
            {blocks.map((block) => (
                <Block key={block.topic} block={block} />
            ))}
        </>
    )
}

export default Blocks