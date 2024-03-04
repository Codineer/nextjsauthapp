"use client"
import Image from "next/image";
import { useState, useEffect } from "react";
import UserContext from "@/contexts/musiccontext";
import Albums from "@/components/sitecomponents/albums";
export default function MusicPageLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const [currentAlbumSongs, setCurrentAlbumSongs] = useState([]);

    return (
        <UserContext.Provider value={[{ currentAlbumSongs, setCurrentAlbumSongs }]}>
            <div>
                <div className='w-screen h-screen bg-black text-white flex gap-2 p-2'>
                    <div className='h-full border border-white w-[34rem] p-2 flex flex-col gap-2'>
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
                    <div className='h-full border border-white w-full'></div>
                </div>
            </div>
        </UserContext.Provider>
    );
}
