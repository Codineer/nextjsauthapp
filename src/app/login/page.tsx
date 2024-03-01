"use client"
import Link from "next/link"
import React from "react"
import { useRouter } from "next/navigation"
import { axios } from "axios"

export default function loginUpPage() {
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    })

    const onLogin = async () => {

    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Login</h1>
            <hr />


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
                type="text"
                id="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.currentTarget.value })}
                placeholder="password" />
            <button
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-500 text-blue-500"
                onClick={onLogin}>
                Login
            </button>
            <Link href={"/signup"}>Go to Sign Up page</Link>
        </div>
    )
}
