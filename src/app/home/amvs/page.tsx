'use client'
import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import axios from 'axios';
import VideoCard from '@/components/sitecomponents/videoCard';
import Link from 'next/link';
const MyVideoComponent = () => {
    const [videos, setvideos] = useState([])
    const fetchAllVideos = async () => {
        const res = await axios.post("/api/music/fetchAllVideos", {})
        console.log(res.data.data)
        setvideos(res.data.data)
    }
    useEffect(() => {
        fetchAllVideos()
    }, [])

    return (
        <div className='p-4'>
            <nav className='pb-5 w-full'>
                <h1 className='font-extrabold text-4xl'>Popular Amvs</h1>
            </nav>

            <div className='flex'>
                {videos.map((videoData: any) => <Link href={`/home/amvs/${videoData._id}`}>

                    <VideoCard video={videoData} />
                </Link>

                )}

            </div>

        </div>
    );
}

export default MyVideoComponent;