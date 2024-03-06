'use client'
import MusicCard from '@/components/sitecomponents/MusicCard'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
interface Album {
    _id: string;
    // Add other properties of your album object here
}

const AlbumPage = () => {
    const [albums, setAlbums] = useState<Album[]>([])
    const pullalbums = async () => {

        try {
            const res = await axios.post('/api/music/displayAllAlbums', { album: "sd" })
            setAlbums(res.data.albums)
            console.log(res.data.albums)
        } catch (error: any) {
            console.log(error.data.message)
        }

    }
    useEffect(() => {

        pullalbums()

    }, [])

    return (
        <div className='p-9'>

            <nav className='pb-5 w-full'>
                <h1 className='font-extrabold text-4xl'>All Albums</h1>
            </nav>
            <div className='flex gap-3 '>
                {albums.map(album => <MusicCard key={album._id} songInfo={album} />)}


            </div>
        </div>
    )
}

export default AlbumPage