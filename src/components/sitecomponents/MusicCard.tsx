import React from 'react'
import Image from 'next/image';

const MusicCard = ({ songInfo }: any) => {
    // console.log(songInfo);
    return (
        <div className='p-2 bg-opacity-20 bg-blue-400  rounded-md w-[176px] overflow-hidden cursor-pointer'>
            <div className="w-40 h-40 relative">
                <Image
                    src={songInfo.img} // Assuming img is the property containing the image path
                    alt=""
                    layout="fill" // Fill the parent container
                    objectFit="cover" // Maintain aspect ratio and cover container
                    className="rounded-lg" // Add any additional styles if needed
                />
            </div>
            <div className="text-center text-white font-medium mt-3 overflow-ellipsis text-lg" style={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
                {songInfo.songName || songInfo.album}
            </div>
            <div className="text-center text-stone-600" style={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
                {songInfo.artist || ""}
            </div>

        </div>
    );
}

export default MusicCard
