"use client"
import { useEffect, useState, useContext } from "react"
import axios from "axios"
import UidContext from "@/contexts/useridcontext";
import UserContext from "@/contexts/musiccontext";
import MusicCard from "@/components/sitecomponents/MusicCard";
const Page = () => {
    const [songList, setSongList] = useState([])
    const [uid] = useContext(UidContext)
    const retrieveAllLikedSongs = async () => {
        try {
            const res = await axios.post('/api/music/displaylikedsongs', { uid })
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
                {songList.map((song: any) => <MusicCard key={song._id} songInfo={song} />)}
            </div>
        </div>
    )
}

export default Page
