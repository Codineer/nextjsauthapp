import { NextRequest, NextResponse } from "next/server";
import LikedSong from "@/models/likedSong";
import { connect } from '@/dbconfig/dbConfig'
import mongoose from "mongoose";
connect()

export async function POST(req: NextRequest) {
    try {

        const { currentSongInfo, uid } = await req.json()


        const fetchedData = await LikedSong.findOne({ user: uid, song: currentSongInfo._id })
        if (fetchedData) {
            return NextResponse.json({ value: true }, { status: 200 })
        }
        else {
            return NextResponse.json({ value: false }, { status: 200 })
        }
    } catch (err) {
        console.log(err)
        return NextResponse.json({ error: "internal server error" }, { status: 500 })
    }
    finally {

    }
}