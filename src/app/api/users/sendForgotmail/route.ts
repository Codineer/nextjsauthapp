import { NextRequest, NextResponse } from "next/server";
import { connect } from '@/dbconfig/dbConfig'
import User from "@/models/userModel";
import { sendEmail } from "@/helpers/mailer";
connect()

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json()
        const { email } = reqBody
        console.log(reqBody)
        const user = await User.findOne({ email })
        if (!user) {
            return NextResponse.json(
                { error: "email not found" },
                { status: 400 })
        }
        await sendEmail({ email, emailType: "RESET", userId: user._id })
        return NextResponse.json({ message: "successfully sent mail" }, { status: 200 })
    } catch (error: any) {
        console.error(error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }


}