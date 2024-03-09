'use client'
import axios from "axios"
const provideSongs = async (albumName: any, setCurrentalbumList: any, setcurrentAlbumName: any) => {
    try {
        const res = await axios.post('/api/music/displayalbums', { album: albumName })
        setCurrentalbumList(res.data.songs)
        setcurrentAlbumName(albumName)

    }
    catch (error: any) {
        console.log(error.data.error)
    }
}
export default provideSongs