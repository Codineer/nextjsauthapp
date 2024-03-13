import { NextRequest, NextResponse } from "next/server";
import LikedSong from "@/models/likedSong";
import { connect } from '@/dbconfig/dbConfig'


export async function POST(req: NextRequest) {
    try {
        await connect()
        const { currentSongInfo, uid } = await req.json()


        const fetchedData = await LikedSong.findOne({ user: uid, song: currentSongInfo._id })
        if (fetchedData) {
            return NextResponse.json({ message: "song already liked" }, { status: 200 })
        }
        const newEntry = await LikedSong.create({

            song: currentSongInfo._id,
            user: uid,
        })


        return NextResponse.json({ message: newEntry, value: "true" }, { status: 200 })
    } catch (err) {

        return NextResponse.json({ error: "internal server error" }, { status: 500 })
    }
    finally {
        // mongoose.disconnect()
    }
}