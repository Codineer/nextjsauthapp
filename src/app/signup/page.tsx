"use client"
import Link from "next/link"
import React from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import toast from "react-hot-toast"
export default function SignUpPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        userName: ""
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(true)

    const [loading, setLoading] = React.useState(false)

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user)
            console.log("signup success", response.data)
            router.push("/login")
        } catch (error: any) {
            console.log("signup failed", error.message)
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }
    React.useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.userName.length > 0) {
            setButtonDisabled(false)
        }

        else {
            setButtonDisabled(true)
        }
    }, [user])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading ? "processing" : "Signup"}</h1>
            <hr />
            <label htmlFor="username">username</label>

            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-500 text-black"
                type="text"
                id="username"
                value={user.userName}
                onChange={(e) => setUser({ ...user, userName: e.currentTarget.value })}
                placeholder="username" />

            <label htmlFor="email">Email</label>

            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-500 text-black"
                type="text"
                id="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.currentTarget.value })}
                placeholder="email" />
            <label htmlFor="password">password</label>

            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-500 text-black"
                type="password"
                id="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.currentTarget.value })}
                placeholder="password" />
            <button
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-500 text-blue-500"
                onClick={onSignup}>
                {buttonDisabled ? "No signup" : "Signup"}
            </button>
            <Link href={"/login"}>Go to login page</Link>
        </div>
    )
}