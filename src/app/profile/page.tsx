"use client"
import React from 'react'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from "react-hot-toast"
const Page = () => {
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

    return (
        <>

            <br />
            <button className='bg-blue-200 hover:bg-blue-700 text-white font=bold py-2 px-4 rounded' onClick={logout}>Logout</button>
            <Link href={"/home"}>
                {/* <button className='bg-green-200 hover:bg-purple-700 text-white font=bold py-2 px-4 rounded' onClick={getUserDetails}>getdata</button> */}
                <button className='bg-green-200 hover:bg-purple-700 text-white font=bold py-2 px-4 rounded'>Home</button>

            </Link>
        </>
    )
}

export default Page
