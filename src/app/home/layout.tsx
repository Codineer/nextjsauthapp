"use client"
import Image from "next/image";
import React, { useEffect } from "react"
import { useState } from "react";
import Link from "next/link";
import UserContext from "@/contexts/musiccontext";
import AlbumList from "@/components/sitecomponents/AlbumList";
import Playbar from "@/components/sitecomponents/playbar";
import UidContext from "@/contexts/useridcontext";
import SongContext from "@/contexts/songcontexrt";
import { GearIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter } from 'next/navigation'
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
    const [currentAlbum, setcurrentAlbum] = useState([])
    const [profileData, setprofileData] = useState("")
    const [currentAlbumList, setCurrentAlbumList] = useState([]);
    const [currentSong, setcurrentSong] = useState({ songName: "no song" })
    const [userId, setuserId] = useState("")
    const router = useRouter()
    const loadProfile = async () => {

        try {
            const res = await axios.get("/api/users/me")
            setuserId(res.data.data._id)
            setprofileData(res.data.data.userName)
        }
        catch (err: any) {
            console.log(err.response.data.error + "ss")
            router.push("/profile")

        }

    }
    useEffect(() => {
        loadProfile()
        console.log('hello')
    }, [])

    return (
        <UidContext.Provider value={[userId]}>
            <SongContext.Provider value={[
                currentSong,
                setcurrentSong
            ]} >
                <UserContext.Provider value={[
                    currentAlbumList,
                    setCurrentAlbumList,
                    currentAlbum, setcurrentAlbum
                ]}>
                    <div className="" >
                        <div className='w-screen bg-custom-background-main bg-cover bg-center bg-no-repeat h-screen bg-black text-white grid gap-2 p-2' style={{ gridTemplateColumns: "350px 1fr" }}>
                            <div className='h-full border border-white p-2 grid grid-flow-col  grid-cols-1 gap-2 ' style={{ gridTemplateRows: "auto 1fr" }}>
                                <div className="w-full p-2 border border-white flex flex-col gap-2">
                                    <Link className="cursor-pointer" href={"/home"}>
                                        <Image alt="" quality="100" width={100} height={20} src="/images/logo.png" />
                                    </Link>
                                    <Link className="cursor-pointer" href={"/home"}>
                                        <h1>Home</h1>
                                    </Link>
                                    <Link className="cursor-pointer" href={"/home/albums"}>

                                        <h1>Albums</h1>
                                    </Link>
                                    <Link href="/home/likedSongs">
                                        <h1>Liked Songs</h1>
                                    </Link>
                                </div>
                                <div className="w-full p-2 border border-white">
                                    <div className="text-2xl font-semibold ">Current Album</div>
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
                                            <Link href="/home/likedSongs">
                                                <DropdownMenuItem>Liked Songs</DropdownMenuItem>
                                            </Link>
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
        </UidContext.Provider >
    );
}
