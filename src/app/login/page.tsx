
"use client"
import Link from "next/link"
import React, { useEffect } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import toast from "react-hot-toast"
export default function LoginUpPage() {
    const router = useRouter()
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(true)

    const [loading, setLoading] = React.useState(false)
    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false)
        }
        else {
            setButtonDisabled(true)
        }


    }, [user])

    const onLogin = async () => {
        setButtonDisabled(true)
        try {
            setLoading(true)
            const response = await axios.post("/api/users/login", user)
            console.log("login success", response.data)
            router.push("/home")
            toast.success("login success")
        } catch (error: any) {
            setButtonDisabled(false)
            console.log(error)
            console.log("login failed", error.response.data.error)
            toast.error(error.response.data.error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-500 text-white">
            <div className="flex flex-col items-center justify-center bg-black  bg-opacity-90 backdrop-blur-sm  rounded-md p-10">



                <label htmlFor="email" className="text-xl pb-2">{loading ? "processing" : "login"}</label>

                <input
                    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-500 text-black"
                    type="text"
                    id="email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.currentTarget.value })}
                    placeholder="email" />
                <label htmlFor="password" className="text-xl pb-2">password</label>

                <input
                    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-500 text-black"
                    type="text"
                    id="password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.currentTarget.value })}
                    placeholder="password" />
                <button
                    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-500 text-blue-500"
                    onClick={buttonDisabled ? undefined : onLogin}>
                    {buttonDisabled ? "No Login" : "login"}
                </button>
                <Link href={"/signup"}>Go to Sign Up page</Link>
                <Link href={"/forgotpassword"}>Forget Password?</Link>
            </div>
        </div>
    )
}