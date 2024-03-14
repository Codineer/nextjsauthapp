import React from 'react'
import Image from 'next/image'
const VideoCard = ({ video }: any) => {

    return (
        <div className='p-2 bg-opacity-20 bg-red-600 w-auto rounded-md  overflow-hidden cursor-pointer'>
            <div className='w-80 h-40 relative'>
                <Image
                    src={video.img} // Assuming img is the property containing the image path
                    alt=""
                    layout="fill" // Fill the parent container
                    objectFit="cover" // Maintain aspect ratio and cover container
                    className="rounded-lg" // Add any additional styles if needed
                />
            </div>
            <h1 className='pt-2'>{video.desc}</h1>

        </div>
    )
}

export default VideoCard
