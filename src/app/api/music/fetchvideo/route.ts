import connectToVMongo from "@/dbconfig/videoDatabase";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
export async function POST(req: NextRequest) {
    try {
        const [videos, client] = await connectToVMongo()
        const { id } = await req.json()

        const videodata = await videos.findOne({ _id: new mongoose.Types.ObjectId(id) })

        // client.close()
        return NextResponse.json({ video: videodata.video }, { status: 200 })
    } catch (err: any) {
        console.log(err)
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}