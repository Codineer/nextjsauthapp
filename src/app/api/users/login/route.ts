import { connect } from '@/dbconfig/dbConfig.ts'
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
            return NextResponse.json({ message: "user doesnt exists" }, { status: 404 })
        }
        const iscorrect = await user.isPasswordCorrect(password)
        if (!iscorrect) {
            return NextResponse.json({ message: "uauthorized,password not coreect" }, { status: 400 })
        }
        return NextResponse.json({ message: "authorized", user }, { status: 200 })
    }
    catch (err: any) {
        console.log(err)
        return NextResponse.json({ err: err.message }, { status: 500 })
    }
}
