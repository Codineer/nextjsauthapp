"use client"
import React from 'react'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from "react-hot-toast"
const page = () => {
    const router = useRouter()
    const logout = async () => {
        try {
            const res = await axios.get("/api/users/logout")
            toast.success('Logout successful')
            router.push("/login")
        }
        catch (error: any) {
            console.log(error.message)
            toast.error(error.message)
        }
    }

    return (
        <>
            <br />
            <button className='bg-blue-200 hover:bg-blue-700 text-white font=bold py-2 px-4 rounded' onClick={logout}>Logout</button>
        </>
    )
}

export default page
