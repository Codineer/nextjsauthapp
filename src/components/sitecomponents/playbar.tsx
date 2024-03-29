
'use client'
import React, { useRef, useState, useContext, useEffect } from 'react'
import Image from 'next/image';
import { PlayIcon, PauseIcon, TrackPreviousIcon, TrackNextIcon, HeartIcon, HeartFilledIcon } from '@radix-ui/react-icons';
import "./playbar.css";
import SongContext from '@/contexts/songcontexrt';
import UserContext from '@/contexts/musiccontext';
import UidContext from '@/contexts/useridcontext';
import axios from 'axios';
const Playbar = () => {
    const albumlist = useContext(UserContext)
    const [isPlaying, setisPlaying] = useState(false)
    const [src, setsrc] = useState("")
    const [liked, setLiked] = useState(false)

    const audioRef: any = useRef(typeof Audio !== 'undefined' ? new Audio() : null);

    const [duration, setDuration] = useState(0);
    const [uid] = useContext(UidContext)
    const [currentSongInfo, currentSonginfofucntion]: any = useContext(SongContext)
    useEffect(() => {
        setsrc(currentSongInfo.songSrc);
        isliked()
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
    const isliked = async () => {

        try {
            const res = await axios.post('/api/music/isliked', { currentSongInfo, uid })
            setLiked(res.data.value)
        } catch (e) {
            setLiked(false)
        }
    }
    const handleLoadedMetadata = async () => {
        setDuration(audioRef.current.duration)
    }

    useEffect(() => {
        if (src) {
            audioRef.current.src = src;
            setisPlaying(true)

            audioRef.current.addEventListener("loadedmetadata", handleLoadedMetadata);
            audioRef.current.play().catch((error: any) => {
                console.error('Failed to play audio:', error);
            });
        }
    }, [src]);

    const nextSong = async () => {
        if (albumlist[0].length) {
            const reIndex = albumlist[0].findIndex((album: any) => album._id === currentSongInfo._id)
            console.log(reIndex)
            if (reIndex !== -1) {
                currentSonginfofucntion(reIndex + 1 < albumlist[0].length ? albumlist[0][reIndex + 1] : albumlist[0][0])
            }
        }
    }

    const previousSong = async () => {
        if (albumlist[0].length) {
            const reIndex = albumlist[0].findIndex((album: any) => album._id === currentSongInfo._id)
            if (reIndex !== -1) {
                currentSonginfofucntion(reIndex - 1 >= 0 ? albumlist[0][reIndex - 1] : albumlist[0][albumlist[0].length - 1])
            }
        }
    }
    async function addLikedSong() {
        try {
            const res = await axios.post("/api/music/addlikedsongs", { currentSongInfo, uid })
            setLiked(res.data.value)
            console.log(res.data.message)
        }
        catch (err: any) {
            console.log(err.response.data.error)
        }
    }
    async function disLikeSong() {
        try {
            const res = await axios.post("/api/music/dislikesong", { currentSongInfo, uid })
            setLiked(res.data.value)
            console.log(res.data.message)
        }
        catch (err: any) {
            console.log(err.response.data.error)
        }
    }
    return (
        currentSongInfo.songName !== "no song" ? (
            <div className='absolute bottom-0 w-full p-2 bg-white bg-opacity-35 grid grid-cols-3 gap-4 '>

                <div className='absolute bottom-[120%] left-2'>
                    <Image alt="" width={200} height={200} src={currentSongInfo.img} className="rounded-md" />
                </div>
                <div className='text-xl font-semibold'>
                    {currentSongInfo.songName}
                </div>
                <div className='flex gap-3 justify-center'>
                    <TrackPreviousIcon width={24} height={24} className='cursor-pointer' onClick={previousSong} />
                    {isPlaying ? (
                        <PauseIcon width={24} height={24} className='cursor-pointer' onClick={playAudio} />
                    ) : (
                        <PlayIcon width={24} height={24} className='cursor-pointer' onClick={playAudio} />
                    )}
                    <TrackNextIcon width={24} height={24} className='cursor-pointer' onClick={nextSong} />
                </div>
                <div className='justify-between flex items-center pr-4'>
                    {duration}
                    {liked ? <HeartFilledIcon width={20} height={20} className="cursor-pointer" onClick={disLikeSong} /> : <HeartIcon width={20} height={20} className="cursor-pointer" onClick={addLikedSong} />}

                </div>

            </div>
        ) : (
            <div></div>
        )
    );
}

export default Playbar
