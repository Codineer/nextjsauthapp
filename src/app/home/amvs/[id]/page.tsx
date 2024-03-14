"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player';
const Page = ({ params }: any) => {
    const [video, setvideo] = useState("")
    const playerConfig = {
        file: {
            forceVideo: true,
        },
    }
    const fetchvideo = async () => {
        const res = await axios.post("/api/music/fetchvideo", { id: params.id })
        setvideo(res.data.video)
    }
    useEffect(() => {

        fetchvideo()

    }, [])

    return (
        <div className='h-[80%] flex justify-center  items-center p-4'>
            <ReactPlayer
                url={video}
                controls
                width="100%"
                height="100%"
                config={playerConfig}

            />
        </div>
    )
}

export default Page
