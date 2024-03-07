import MusicCard from './MusicCard'
import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { ChevronRight, ChevronLeft } from 'lucide-react'
import SongContext from '@/contexts/songcontexrt'
const Likedalbums = () => {
    const [noOfSet, setnoOfSet] = useState(0)
    const [sliced, setsliced] = useState([])
    const [albumSetIndex, setAlbumSetIndex] = useState(0)
    const [songs, setSongs] = useState([])
    const currentSongInfo = useContext(SongContext)
    const [albumImage, setAlbumImage] = useState("")//album not needed beacuse i will be showing only songs from love album
    const pullsongsfromalbums = async (album: any) => {
        try {
            const res = await axios.post('/api/music/displayalbums', { album: album })
            setnoOfSet(Math.floor(res.data.songs.length / 5))
            setSongs(res.data.songs)

        }
        catch (err: any) {
            console.log(err.data.error)
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

        </>


    )
}

export default Likedalbums
