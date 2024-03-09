'use client'
import axios from "axios"
const provideSongs = async (albumName: any, setCurrentalbumList: any, setcurrentAlbum: any) => {
    try {
        const res = await axios.post('/api/music/displayalbums', { album: albumName })
        setCurrentalbumList(res.data.songs)
        setcurrentAlbum([albumName, res.data.albumId])

    }
    catch (error: any) {
        console.error(error)
        console.log(error.data.error)
    }
}
export default provideSongs