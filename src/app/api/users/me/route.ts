import { getDataFromToken } from '@/helpers/getDataFromToken.ts'
import { NextRequest, NextResponse } from 'next/server'
import User from "@/models/userModel.js"
import { connect } from "@/dbconfig/dbConfig"

connect()


export async function GET(req: NextRequest) {
    try {
        const userId = await getDataFromToken(req)
        const user = await User.findById(userId).select("-password")

        return NextResponse.json({
            message: "User Found",
            data: user
        })

    }
    catch (error: any) {

        return NextResponse.json(
            {
                error: error.message,
            },
            {
                status: 400,
            }
        )
    }
}