"use client"
import Image from "next/image";
import React, { Children, useEffect } from "react"
import { useState } from "react";
import Link from "next/link";
import UserContext from "@/contexts/musiccontext";
import AlbumList from "@/components/sitecomponents/AlbumList";
import Playbar from "@/components/sitecomponents/playbar";
import SongContext from "@/contexts/songcontexrt";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import axios from "axios";
export default function MusicPageLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const [profileData, setprofileData] = useState("")
    const [currentAlbum, setCurrentAlbum] = useState([]);
    const [currentSong, setcurrentSong] = useState({ songName: "no song" })
    const loadProfile = async () => {

        try {
            const res: any = await axios.get("/api/users/me")
            console.log(res)
            setprofileData(res.data.data.userName)
        }
        catch (err) {
            console.log(err)
        }

    }
    useEffect(() => {
        loadProfile()
        console.log('hello')
    }, [])

    return (
        <SongContext.Provider value={[
            currentSong,
            setcurrentSong
        ]} >
            <UserContext.Provider value={[
                currentAlbum,
                setCurrentAlbum,
            ]}>
                <div className="" >
                    <div className='w-screen bg-custom-background-main bg-cover bg-center bg-no-repeat h-screen bg-black text-white grid gap-2 p-2' style={{ gridTemplateColumns: "350px 1fr" }}>
                        <div className='h-full border border-white p-2 flex flex-col gap-2'>
                            <div className="w-full h-auto p-2 border border-white">
                                <Image alt="" quality="100" width={100} height={20} src="/images/logo.png" />
                                <Link href={"/home"}>

                                    <h1>Home</h1>
                                </Link>
                                <Link href={"/home/albums"}>

                                    <h1>Albums</h1>
                                </Link>
                            </div>
                            <div className="h-full w-full p-2 border border-white">
                                <div className="text-2xl font-semibold">Current Album</div>

                                <AlbumList />

                            </div>
                        </div>
                        <div className='h-full border border-white relative' >
                            <nav className="h-[50px] border-b-[1px] w-full flex justify-end px-3">
                                <div className="flex gap-2 justify-center items-center">
                                    <h1 className="text-lg font-semibold">Welcome,{profileData}</h1>
                                    <Avatar>
                                        <AvatarImage src="https://github.com/shadcn.png" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>

                                </div>

                            </nav>
                            {children}
                            <Playbar />
                        </div>
                    </div>
                </div>
            </UserContext.Provider>
        </ SongContext.Provider>

    );
}
