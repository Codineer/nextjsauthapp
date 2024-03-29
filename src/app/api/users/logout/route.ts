import { NextRequest, NextResponse } from "next/server"
export async function GET() {
    try {
        const response = NextResponse.json(
            {
                message: "Logout succesfull",
                success: true,
            },
            {
                status: 200,
            }
        )
        response.cookies.set("token", "",
            {
                httpOnly: true,
                expires: new Date(0)//no need
            }
        )
        return response

    } catch (error: any) {
        return NextResponse.json(
            {
                error: error.message
            },
            {
                status: 500
            }
        )
    }
}