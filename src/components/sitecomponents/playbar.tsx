
'use client'
import React, { useRef, useState, useContext, useEffect, useCallback } from 'react'
import Image from 'next/image';
import { PlayIcon, PauseIcon, TrackPreviousIcon, TrackNextIcon } from '@radix-ui/react-icons';
import "./playbar.css";
import SongContext from '@/contexts/songcontexrt';

const Playbar = () => {
    const [, forceUpdate] = useState();
    const [isPlaying, setisPlaying] = useState(false)
    const [src, setsrc] = useState("")
    const audioRef = useRef(new Audio())
    const [duration, setDuration] = useState(0);
    const [currentSongInfo, currentSonginfofucntion]: any = useContext(SongContext)
    useEffect(() => {
        setsrc(currentSongInfo.songSrc);
    }, [currentSongInfo]);

    const playAudio = () => {
        if (audioRef.current.paused) {

            audioRef.current.play()
            setisPlaying(true)
        }
        else {
            audioRef.current.pause()
            setisPlaying(false)
        }
    };

    const handleLoadedMetadata = () => {
        setDuration(audioRef.current.duration)

    }

    useEffect(() => {
        if (src) {
            audioRef.current.src = src;
            setisPlaying(true)
            audioRef.current.addEventListener("loadedmetadata", handleLoadedMetadata);
            audioRef.current.play().catch((error) => {
                console.error('Failed to play audio:', error);
            });

        }
    }, [src]);



    return (

        <div className='absolute bottom-0 w-full p-2 bg-white bg-opacity-35 grid grid-cols-3 gap-4 '>
            <div className='absolute bottom-[120%] left-2'><Image alt="" width={200} height={200} src={currentSongInfo.img} className="rounded-md" /></div>
            <div className='text-xl font-semibold'>
                {currentSongInfo.songName}
            </div>
            <div className='flex gap-3 justify-center'>
                <TrackPreviousIcon width={24} height={24} />
                {isPlaying ? (
                    <PauseIcon width={24} height={24} onClick={playAudio} />
                ) : (
                    <PlayIcon width={24} height={24} onClick={playAudio} />
                )}
                <TrackNextIcon width={24} height={24} />
            </div>
            <div>
                {duration}
            </div>
            {/* <Slider defaultValue={[33]} max={100} step={silderval} className=' w-full absolute bottom-[100%]' /> */}

        </div>
    )
}

export default Playbar
