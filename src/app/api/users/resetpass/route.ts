import { NextRequest, NextResponse } from "next/server";
import { connect } from '@/dbconfig/dbConfig'
import User from "@/models/userModel";


connect()

export async function POST(req: NextRequest) {
    try {
        const reqbody = await req.json()
        const { token, password } = reqbody
        const user = await User.findOne(
            {
                forgetPasswordToken: token,
                forgetPasswordExpiry: {
                    $gt: Date.now()
                }
            })

        if (!user) {
            return NextResponse.json({ error: "wrong token found" }, { status: 404 })
        }

        user.password = password
        user.forgetPasswordToken = undefined
        user.forgetPasswordExpiry = undefined
        await user.save()
        console.log(user, "ds")
        return NextResponse.json({ message: "done", user }, { status: 200 })
    }
    catch (err: any) {
        console.log(err)
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}