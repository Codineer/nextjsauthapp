import { NextRequest, NextResponse } from "next/server";
import { connect } from '@/dbconfig/dbConfig'
import User from "@/models/userModel";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect()

export async function POST(req: NextRequest) {
    try {
        // const token = req.cookies.get('token')?.value || ""
        const { oldPassword, newPassword } = await req.json()
        const _id = await getDataFromToken(req)
        const user = await User.findOne(
            {
                _id
            })

        if (!user) {
            return NextResponse.json({ error: "wrong token found" }, { status: 404 })
        }
        if (!await user.isPasswordCorrect(oldPassword)) {
            return NextResponse.json({ error: "password not correct" }, { status: 400 })
        }
        user.password = newPassword

        await user.save()
        return NextResponse.json({ message: "done", user }, { status: 200 })
    }
    catch (err: any) {
        console.log(err)
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}