import React, { useContext } from 'react'
import UserContext from '@/contexts/musiccontext'
const AlbumList = () => {
    const list = useContext(UserContext)
    return (
        <div>
            <button onClick={() => list[1](["3131"])}>{list[0]}</button>
        </div>
    )
}

export default AlbumList
