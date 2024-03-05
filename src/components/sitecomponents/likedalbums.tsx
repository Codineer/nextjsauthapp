import MusicCard from './MusicCard'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ChevronRight, ChevronLeft } from 'lucide-react'
const Likedalbums = () => {
    let noOfSet = 0
    const [sliced, setsliced] = useState([])
    const [albumSetIndex, setAlbumSetIndex] = useState(0)
    const [songs, setSongs] = useState([])
    const [isDisabled, setDisabled] = useState(true)
    const [albumImage, setAlbumImage] = useState("")//album not needed beacuse i will be showing only songs from love album
    const pullsongsfromalbums = async (album: any) => {
        try {
            const res = await axios.post('/api/music/displayalbums', { album: album })
            noOfSet = Math.floor(res.data.songs.length / 5) + 1
            console.log(res.data.songs, "hazrat")
            setSongs(res.data.songs)
            const startIndex = albumSetIndex;
            const endIndex = (albumSetIndex * 5) + 5;
            setsliced(res.data.songs.slice(startIndex, endIndex));
            setDisabled(false)
        }
        catch (err: any) {
            console.log(err.data.error)
        }
        finally {

        }
    }
    useEffect(() => {

        const startIndex = albumSetIndex;
        const endIndex = (albumSetIndex * 5) + 5;
        console.log(songs, "utkarsh")
        setsliced(songs.slice(startIndex, endIndex))
    }, [albumSetIndex])

    useEffect(() => {
        pullsongsfromalbums("love")
    }, [])

    return (
        <>

            <nav className='display flex justify-between pb-5'>
                <h1 className='font-extrabold text-4xl'>Most Liked</h1>
                <div className='flex gap-1 '>
                    <ChevronLeft className='cursor-pointer' onClick={() => console.log("hello2")} />
                    <ChevronRight className='cursor-pointer' onClick={() => console.log("hello")} />
                </div>
            </nav>
            <div className="song-list flex gap-4 flex-wrap" >


                {sliced.map((songData: any) =>
                (<>

                    <MusicCard key={songData._id} songInfo={songData} />

                </>
                ))
                }
            </div>

        </>


    )
}

export default Likedalbums
