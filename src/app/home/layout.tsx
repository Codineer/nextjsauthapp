"use client"
import Image from "next/image";
import React, { Children } from "react"
import { useState } from "react";
import Link from "next/link";
import UserContext from "@/contexts/musiccontext";
import AlbumList from "@/components/sitecomponents/AlbumList";
import Playbar from "@/components/sitecomponents/playbar";
import SongContext from "@/contexts/songcontexrt";
export default function MusicPageLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {


    const [currentAlbum, setCurrentAlbum] = useState([]);
    const [currentSong, setcurrentSong] = useState({ songName: "no song" })

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
                            <nav className="h-[50px] border-b-[1px] w-full ">
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
