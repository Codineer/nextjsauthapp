import MusicCard from './MusicCard'
import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { ChevronRight, ChevronLeft } from 'lucide-react'
import SongContext from '@/contexts/songcontexrt'
import { ScrollArea } from '../ui/scroll-area'
import UserContext from '@/contexts/musiccontext'
const Likedalbums = () => {
    const [noOfSet, setnoOfSet] = useState(0)
    const [sliced, setsliced] = useState([])
    const [albumSetIndex, setAlbumSetIndex] = useState(0)
    const [songs, setSongs] = useState([])
    const albumlist = useContext(UserContext)
    const currentSongInfo = useContext(SongContext)
    const [albumImage, setAlbumImage] = useState("")//album not needed beacuse i will be showing only songs from love album
    const pullsongsfromalbums = async (album: any) => {
        try {
            const res = await axios.post('/api/music/displayalbums', { albumId: "65e6074c2b09b710496a6c5a" })
            albumlist[1](res.data.songs)
            albumlist[3]([res.data.albumName, "65e6074c2b09b710496a6c5a"])
            setnoOfSet(Math.floor(res.data.songs.length / 5))
            setSongs(res.data.songs)

        }
        catch (err: any) {
            console.log(err.response.data.error)
        }
        finally {

        }
    }


    useEffect(() => {



        const startIndex = albumSetIndex != 0 ? (albumSetIndex * 5) : 0;
        const endIndex = (albumSetIndex * 5) + 5;
        setsliced(songs.slice(startIndex, endIndex))


    }, [albumSetIndex, songs])

    useEffect(() => {
        pullsongsfromalbums("love")
    }, [])

    return (
        <>

            <nav className='display flex justify-between pb-5'>
                <h1 className='font-extrabold text-4xl'>Most Liked</h1>
                <div className='flex gap-1 '>
                    <ChevronLeft className='cursor-pointer' onClick={(sliced.length > 0) ? () => {
                        if ((albumSetIndex - 1) >= 0) { setAlbumSetIndex(albumSetIndex - 1) }
                        else { setAlbumSetIndex(noOfSet) }
                    }
                        : undefined} />
                    <ChevronRight className='cursor-pointer' onClick={(sliced.length > 0) ? () => {
                        if ((albumSetIndex + 1) <= noOfSet) {
                            setAlbumSetIndex(albumSetIndex + 1)
                        } else { setAlbumSetIndex(0) }
                    } : undefined} />
                </div>
            </nav>
            <ScrollArea className="h-[250px] w-full rounded-md " >
                <div className="song-list flex gap-4 flex-wrap" >
                    {sliced.map((songData: any) =>
                    (<>
                        <div onClick={() => { currentSongInfo[1](songData) }}>
                            <MusicCard key={songData._id} songInfo={songData} />
                        </div>
                    </>
                    ))
                    }
                </div>
            </ScrollArea>

        </>


    )
}

export default Likedalbums
