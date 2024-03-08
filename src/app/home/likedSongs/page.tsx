"use client"
import { useState } from "react"

const Page = () => {
    const [songList, setSongList] = useState(["sd"])
    return (
        <div className='p-9'>
            <nav className='pb-5 w-full'>
                <h1 className='font-extrabold text-4xl'>Your Liked Songs</h1>
            </nav>
            <div>
                {songList.map((song) => <div>song</div>)}
            </div>
        </div>
    )
}

export default Page
