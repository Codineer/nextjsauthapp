"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player';
const Page = ({ params }: any) => {
    const [video, setvideo] = useState("")
    const fetchvideo = async () => {
        const res = await axios.post("/api/music/fetchvideo", { id: params.id })
        setvideo(res.data.video)
    }
    useEffect(() => {

        fetchvideo()

    }, [])

    return (
        <div>

            <ReactPlayer
                url={video}
                controls
                width="100%"
                height="100%"
            />
        </div>
    )
}

export default Page
