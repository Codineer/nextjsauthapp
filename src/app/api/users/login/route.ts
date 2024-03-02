import { connect } from "@dbconfig/dbConfig.js"
import User from "@/models/userModel.js"
import { NextRequest, NextResponse } from "next/server"
connect()



export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json()
        const { email, password } = reqBody
        console.log(req.body)
        const user = await User.findOne({ email })
        if (!user) {
            NextResponse.json({ message: "user doesnt exists" }, { status: 404 })
        }
        const iscorrect = await user.isPasswordCorrect(password)
        if (!iscorrect) {
            NextResponse.json({ message: "uauthorized,password not coreect" }, { status: 400 })
        }
        NextResponse.json({ message: "authorized", user }, { status: 200 })
    }
    catch (err: any) {
        NextResponse.json({ err: err.message }, { status: 500 })
    }
}
