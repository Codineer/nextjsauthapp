'use client'
import React, { useContext, useEffect } from 'react'
import UserContext from '@/contexts/musiccontext'
import Image from 'next/image'
import SongContext from '@/contexts/songcontexrt'
import { ScrollArea } from '../ui/scroll-area'
import provideSongs from '@/helpers/providesongs'
const AlbumList = () => {
    const albumlist = useContext(UserContext)
    // const [albumlist, setalbumlist] = useState(second)
    const [currentSongInfo, currentSonginfofucntion]: any = useContext(SongContext)
    const changeAlbumList = async () => {
        if (albumlist[2][1] !== currentSongInfo.album) {
            await provideSongs(currentSongInfo.album, albumlist[1], albumlist[3])
        }


    }
    useEffect(() => {

        changeAlbumList()

    }, [currentSongInfo])



    return (
        <ScrollArea className="h-[300px] w-full rounded-md">

            <div className='flex flex-col gap-2 py-3 overflow-auto '>
                {albumlist[0].map((song: any) =>

                    <div onClick={() => { currentSonginfofucntion(song) }} className="grid grid-cols-4  rounded cursor-pointer bg-opacity-30 bg-red-600  ">

                        <Image alt="" width={60} height={60} src={song.img} className=" col-span-1 row-span-2" />

                        <div className="col-span-3 flex flex-col justify-center">
                            <h4 className="text-white text-lg font-semibold">{song.songName}</h4>
                            <h1 className="text-gray-300">{song.artist}</h1>
                        </div>

                    </div>

                )
                }
            </div >
        </ScrollArea>
    )
}

export default AlbumList
