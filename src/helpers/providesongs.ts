'use client'
import axios from "axios"
const provideSongs = async (albumId: any, setCurrentalbumList: any, setcurrentAlbum: any) => {
    console.log(albumId)
    try {

        const res = await axios.post('/api/music/displayalbums', { albumId: albumId })
        setCurrentalbumList(res.data.songs)
        setcurrentAlbum([res.data.albumName, albumId])

    }
    catch (error: any) {
        console.error(error)
        console.log(error.data.error)
    }
}
export default provideSongs