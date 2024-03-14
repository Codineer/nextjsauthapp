import connectToVMongo from "@/dbconfig/videoDatabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const [videos, client] = await connectToVMongo()

        const allVideodata = await videos.find({})
        // client.close()
        return NextResponse.json({ data: await allVideodata.toArray() }, { status: 200 })
    } catch (err: any) {
        console.log(err)
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}