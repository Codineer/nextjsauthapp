import likedSong from '@/models/likedSong.js'
import { NextRequest, NextResponse } from "next/server"
import mongoose from 'mongoose'


export async function POST(req: NextRequest) {
    try {
        try {
            await mongoose.connect(process.env.MONGO_URI!)
        }
        catch (error: any) {
            return NextResponse.json({ error: error.message }, { status: 500 })
        }
        const { uid } = await req.json()


        const retrievedEntries = await likedSong.find({ user: uid })
        console.log(retrievedEntries)

        mongoose.disconnect()
        return NextResponse.json({ message: "songs retrived", likedSongs: retrievedEntries }, { status: 200 })
    } catch (error: any) {
        mongoose.disconnect()
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}