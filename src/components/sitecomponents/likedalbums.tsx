import MusicCard from './MusicCard'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
const Likedalbums = () => {
    const [songs, setSongs] = useState([])
    const [albumImage, setAlbumImage] = useState("")//album not needed beacuse i will be showing only songs from love album
    const pullsongsfromalbums = async (album: any) => {
        try {
            const res = await axios.post('/api/music/displayalbums', { album: album })
            console.log(res.data.message)
            console.log(res.data.songs)
            setSongs(res.data.songs)

            console.log(res.data.albumImage)
        }
        catch (err: any) {
            console.log(err.data.error)
        }
        finally {

        }
    }
    useEffect(() => {
        pullsongsfromalbums("love")
    }, [])

    return (
        <div>
            <div className="song-list">
                {songs.map((songData, index) => (
                    <MusicCard key={index} songInfo={songData} /> //each song from love album will be shown
                ))
                }
            </div>
        </div>
    )
}

export default Likedalbums
