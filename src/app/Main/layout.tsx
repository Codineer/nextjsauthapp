"use client"
import Image from "next/image";
import { useState, useEffect } from "react";
import UserContext from "@/contexts/musiccontext";

export default function MusicPageLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const [currentAlbumSongs, setCurrentAlbumSongs] = useState([]);
    useEffect(() => {

    }, [])

    return (
        <UserContext.Provider value={[{ currentAlbumSongs, setCurrentAlbumSongs }]}>
            <div className="" >
                <div className='w-screen h-screen bg-black text-white grid gap-2 p-2' style={{ gridTemplateColumns: "350px 1fr" }}>
                    <div className='h-full border border-white p-2 flex flex-col gap-2'>
                        <div className="w-full h-auto p-2 border border-white">
                            <Image alt="" quality="100" width={100} height={20} src="/images/logo.png" />
                            <h1>Home</h1>
                            <h1>Albums</h1>
                        </div>
                        <div className="h-full w-full p-2 border border-white">
                            <div className="">Current Album</div>
                            <div>
                                {currentAlbumSongs.map((song) => (
                                    <div></div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className='h-full border border-white ' >
                        <nav className="h-[50px] border-b-[1px] w-full ">

                        </nav>
                        {children}
                    </div>
                </div>
            </div>
        </UserContext.Provider>
    );
}
