'use client'
import MusicCard from '@/components/sitecomponents/MusicCard'
import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import UserContext from '@/contexts/musiccontext'
import Link from 'next/link'
const AlbumPage = () => {
    const [albums, setAlbums] = useState<any>([])
    const [currentAlbum, setcurrentAlbum] = useState("")
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
    const provideSongs = async (albumName: any) => {
        try {
            const res = await axios.post('/api/music/displayalbums', { album: albumName })
            albumliststate[1](res.data.songs)
            setcurrentAlbum(albumName)

        }
        catch (error: any) {
            console.log(error.data.error)
        }
    }

    return (
        <div className='p-9'>

            <nav className='pb-5 w-full'>
                <h1 className='font-extrabold text-4xl'>All Albums</h1>
            </nav>
            <div className='flex gap-3 '>
                {albums.map((album: any) =>
                    <Link href={`/home/albums/${album.album}`}>
                        <div onClick={() => {
                            album.album != currentAlbum ? provideSongs(album.album)
                                : undefined
                        }}><MusicCard key={album._id} songInfo={album} /></div>
                    </Link>
                )}


            </div>
        </div >
    )
}

export default AlbumPage