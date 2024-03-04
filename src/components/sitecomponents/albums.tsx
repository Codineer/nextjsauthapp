import React, { useContext } from 'react'
import UserContext from '@/contexts/musiccontext'
const albums = () => {
    const first: any = useContext(UserContext)
    return (
        <div>
            {first[0].currentAlbumSongs}
        </div>
    )
}

export default albums
