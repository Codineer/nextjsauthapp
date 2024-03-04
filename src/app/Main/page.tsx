"use client"
import React, { useEffect } from 'react'
import Likedalbums from '@/components/sitecomponents/likedalbums'
const MainPage = () => {


    return (
        <div className='p-9'>
            <h1 className='font-extrabold text-4xl'>Most Liked</h1>
            <div className='w-full'>
                <Likedalbums />
            </div>
        </div>
    )
}

export default MainPage
