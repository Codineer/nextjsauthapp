'use client'
import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import MusicCard from '@/components/sitecomponents/MusicCard'
import SongContext from '@/contexts/songcontexrt'

const UserProfile = ({ params }: any) => {
    console.log(params)
    const [songs, setSongs] = useState([])
    const currentSongInfo = useContext(SongContext)

    const pullsongsfromalbums = async (album: any) => {
        try {
            const res = await axios.post('/api/music/displayalbums', { album: album })
            setSongs(res.data.songs)

        }
        catch (err: any) {
            console.log(err.data.error)
        }
        finally {

        }
    }
    useEffect(() => {
        pullsongsfromalbums(params.id)
    }, [])
    return (

        <div className='p-9 '>
            <div className="song-list flex gap-4 flex-wrap" >


                {songs.map((songData: any) =>
                (<>


                    <div onClick={() => { currentSongInfo[1](songData), console.log(currentSongInfo[0]) }}>

                        <MusicCard key={songData._id} songInfo={songData} />
                    </div>


                </>
                ))
                }


            </div>

        </div>

    )
}

export default UserProfile
