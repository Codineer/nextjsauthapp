import { connect } from '@/dbconfig/dbConfig'
import jwt from "jsonwebtoken";
import User from "@/models/userModel.js"
import { NextRequest, NextResponse } from "next/server"
connect()


export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json()
        const { email, password } = reqBody
        console.log(reqBody)
        const user = await User.findOne({ email })
        if (!user) {
            return NextResponse.json({ error: "user doesnt exists" }, { status: 400 })
        }
        const iscorrect = await user.isPasswordCorrect(password)
        if (!iscorrect) {
            return NextResponse.json({ error: "uauthorized,password not coreect" }, { status: 400 })
        }
        if (!user.isVerified) {

            return NextResponse.json({ error: "token not verified" }, { status: 400 })
        }
        //create token data
        const tokendata = {
            _id: user._id,
            userName: user.userName,
            email: user.email
        }

        //create token
        const token = await jwt.sign(tokendata, process.env.TOKEN_SECRET!, { expiresIn: "1d" })
        const response = NextResponse.json({
            message: "login successful",
            success: true,
        }, { status: 200 })
        response.cookies.set("token", token, {
            httpOnly: true
        })

        return response
    }
    catch (error: any) {
        console.log(error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
