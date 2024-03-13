"use client"
import { useEffect, useState } from "react"
import axios from "axios"
const Page = () => {
    const [songList, setSongList] = useState([])
    const retrieveAllLikedSongs = async () => {
        try {
            const res = await axios.get('/api/music/displaylikedsongs')
            setSongList(res.data.likedSongs)
            console.log(res)
        }
        catch (error: any) {
            console.log(error.response.data.error)
        }
    }
    useEffect(() => {
        retrieveAllLikedSongs()
    }, [])

    return (
        <div className='p-9'>
            <nav className='pb-5 w-full'>
                <h1 className='font-extrabold text-4xl'>Your Liked Songs</h1>
            </nav>
            <div>
                {songList.map((song) => <div>song</div>)}
            </div>
        </div>
    )
}

export default Page
