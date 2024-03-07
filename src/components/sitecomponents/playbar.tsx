import React, { useRef, useState, useContext } from 'react'
import Image from 'next/image';
import { Slider } from "@/components/ui/slider"
import { PlayIcon, PauseIcon, TrackPreviousIcon, TrackNextIcon } from '@radix-ui/react-icons';
import "./playbar.css";
import SongContext from '@/contexts/songcontexrt';
const Playbar = () => {
    const [currentSongInfo, currentSonginfofucntion]: any = useContext(SongContext)
    return (

        <div className='absolute bottom-0 w-full p-2 bg-white bg-opacity-35 grid grid-cols-3 gap-4 '>
            <div className='absolute bottom-[120%] left-2'><Image alt="" width={200} height={200} src={currentSongInfo.img} className="rounded-md" /></div>
            <div className='text-xl font-semibold'>

                {currentSongInfo.songName}
            </div>
            <div className='flex gap-3 justify-center'>
                <TrackPreviousIcon width={24} height={24} />
                <PlayIcon width={24} height={24} />
                <TrackNextIcon width={24} height={24} />
            </div>
            <div>

            </div>
            {/* <Slider defaultValue={[33]} max={100} step={silderval} className=' w-full absolute bottom-[100%]' /> */}

        </div>
    )
}

export default Playbar
