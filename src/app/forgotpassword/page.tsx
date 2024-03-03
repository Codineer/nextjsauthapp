"use client"
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
const forgetPasswordPage = () => {
    const [email, setEmail] = useState({ email: "" })
    const router = useRouter()
    const [buttonDisabled, setButtonDisabled] = useState(true)
    useEffect(() => {
        if (email.email !== "") {
            setButtonDisabled(false)
        }
    }, [email])

    const forgotpasswordButton = async () => {
        try {
            const res = await axios.post("api/users/sendForgotmail", email)
            alert("check email for password change utility" + res.data.message)
            router.push("/login")
        }
        catch (error: any) {
            console.log(error.response.data.error)
        }
    }
    return (
        <div className='flex h-screen w-screen items-center justify-center'>
            <div className="flex flex-col rounded border border-white p-1 w-1/5 gap-5 h-1/3 justify-center items-center">
                <h1 className='text-center'>Write email for recovery</h1>
                <label htmlFor="email">Email</label>
                <input type="text" id="email" value={email.email} onChange={(e) => setEmail({ email: e.currentTarget.value })} />
                <button className="p-2 text-black bg-white" onClick={buttonDisabled ? () => console.log("") : forgotpasswordButton}>Click</button>
            </div>

        </div>
    )
}

export default forgetPasswordPage
