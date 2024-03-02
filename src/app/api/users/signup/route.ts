import { connect } from '@/dbconfig/dbConfig.ts'
import User from "@/models/userModel.js"
import bcryptjs from "bcryptjs"
import { NextRequest, NextResponse } from 'next/server'

connect()



export async function POST(req: NextRequest) {
    try {
        // Your code for handling the POST request goes here

        // Example: Fetch data from request body
        const reqBody = await req.json()
        const { email, userName, password } = reqBody


        const user = await User.findOne({ email })
        if (user) {
            return NextResponse.json({ error: "user already exists" }, { status: 400 })
        }
        //hash password
        const newUser = await User.create({

            email,
            password: password,
            userName: userName.toLowerCase()
        })

        console.log(newUser)
        return NextResponse.json({
            message: "User created successfully",
            success: true,
            newUser
        }, { status: 200 });
    } catch (error: any) {
        // Respond with an error message and status code 500 Internal Server Error
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}