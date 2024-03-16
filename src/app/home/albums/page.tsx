'use client'
import MusicCard from '@/components/sitecomponents/MusicCard'
import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import UserContext from '@/contexts/musiccontext'
import Link from 'next/link'
import provideSongs from '@/helpers/providesongs'
const Page = () => {
    const [albums, setAlbums] = useState<any>([])
    const albumliststate = useContext(UserContext)
    const pullalbums = async () => {

        try {
            const res = await axios.post('/api/music/displayAllAlbums', { album: "sd" })
            setAlbums(res.data.albums)
            console.log(res.data.albums)
        } catch (error: any) {
            console.log(error.data.error)
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
                {albums.map((album: any) =>

                    <div onClick={() => {
                        album.album != albumliststate[2][0] ? provideSongs(album._id, albumliststate[1], albumliststate[3])
                            : undefined;
                    }}><Link href={`/home/albums/${album._id}`}><MusicCard key={album._id} songInfo={album} /></Link></div>

                )}


            </div>
        </div >
    )
}

export default Page