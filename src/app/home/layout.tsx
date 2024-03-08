"use client"
import Image from "next/image";
import React, { Children, useEffect } from "react"
import { useState } from "react";
import Link from "next/link";
import UserContext from "@/contexts/musiccontext";
import AlbumList from "@/components/sitecomponents/AlbumList";
import Playbar from "@/components/sitecomponents/playbar";
import SongContext from "@/contexts/songcontexrt";
import { GearIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

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
                        <div className='h-full border border-white p-2 flex flex-col gap-2 '>
                            <div className="w-full h-auto p-2 border border-white flex flex-col gap-2">
                                <Link className="cursor-pointer" href={"/home"}>
                                    <Image alt="" quality="100" width={100} height={20} src="/images/logo.png" />
                                </Link>
                                <Link className="cursor-pointer" href={"/home"}>
                                    <h1>Home</h1>
                                </Link>
                                <Link className="cursor-pointer" href={"/home/albums"}>

                                    <h1>Albums</h1>
                                </Link>
                                <h1>Liked Songs</h1>
                            </div>
                            <div className="h-full w-full p-2 border border-white">
                                <div className="text-2xl font-semibold">Current Album</div>

                                <AlbumList />

                            </div>
                        </div>
                        <div className='h-full border border-white relative' >
                            <nav className="h-[50px] border-b-[1px] w-full flex justify-between px-3">
                                <DropdownMenu>
                                    <DropdownMenuTrigger><GearIcon width={25} height={25} className="cursor-pointer" /></DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>Profile</DropdownMenuItem>
                                        <Link href="/changepassword">
                                            <DropdownMenuItem>Change Password</DropdownMenuItem>
                                        </Link>
                                        <DropdownMenuItem>Liked Songs</DropdownMenuItem>
                                        <DropdownMenuItem>Liked Video</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>

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
