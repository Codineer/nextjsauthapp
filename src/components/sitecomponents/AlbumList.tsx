'use client'
import React, { useContext } from 'react'
import UserContext from '@/contexts/musiccontext'
import Image from 'next/image'
import SongContext from '@/contexts/songcontexrt'

const AlbumList = () => {
    const albumlist = useContext(UserContext)
    const [currentSongInfo, currentSonginfofucntion]: any = useContext(SongContext)

    // console.log(albumlist[0])
    return (
        <div className='flex flex-col gap-2 py-3 overflow-auto '>
            {albumlist[0].map((song: any) =>


                <div onClick={() => { currentSonginfofucntion(song) }} className="grid grid-cols-4  rounded cursor-pointer bg-slate-500 bg-opacity-80 ">

                    <Image alt="" width={60} height={60} src={song.img} className=" col-span-1 row-span-2" />

                    <div className="col-span-3 flex flex-col justify-center">
                        <h4 className="text-white text-lg font-semibold">{song.songName}</h4>
                        <h1 className="text-gray-300">{song.artist}</h1>
                    </div>

                </div>

            )
            }
        </div >
    )
}

export default AlbumList
