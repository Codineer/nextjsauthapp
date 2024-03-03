"use client"
import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
const Page = () => {
    const [token, setToken] = useState("")
    const [password, setPassword] = useState("")
    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, [])
    const verifyPassToken = async () => {
        if (password.length > 0 && token.length > 0) {
            try {
                const res = await axios.post("api/users/resetpass", { token, password })
                alert('password change')
                console.log("succcessful", res)
            }
            catch (err: any) {
                console.log(err.response.data.error)
            }
        }
    }


    return (
        <div className='flex flex-col h-screen w-screen items-center justify-center gap-2'>
            <label htmlFor="password">enter new password</label>
            <input className="text-black" type="text" id="password" value={password} onChange={(e) => setPassword(e.currentTarget.value)} />
            <button className='mx-auto' onClick={verifyPassToken}>click me </button>
        </div>
    )

}

export default Page
