"use client"
import React from 'react'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from "react-hot-toast"
const page = () => {
    const router = useRouter()
    const [data, setData] = React.useState("nothing")
    const logout = async () => {
        try {
            const res = await axios.get("/api/users/logout")
            toast.success('Logout successful')
            router.push("/login")
        }
        catch (error: any) {
            console.log(error.response.data.error)
            toast.error(error.response.data.error)
        }
    }
    const getUserDetails = async () => {
        const res: any = await axios.get("/api/users/me")
        setData(res.data.data._id)
    }
    return (
        <>
            <h2 className='p-1 rounded bg-green-400'>{data === "nothing" ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
            <br />
            <button className='bg-blue-200 hover:bg-blue-700 text-white font=bold py-2 px-4 rounded' onClick={logout}>Logout</button>
            <button className='bg-green-200 hover:bg-purple-700 text-white font=bold py-2 px-4 rounded' onClick={getUserDetails}>getdata</button>
        </>
    )
}

export default page
