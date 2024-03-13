import connectToMongo from '@/dbconfig/musicDatabase'
import likedSong from '@/models/likedSong.js'
import { NextRequest, NextResponse } from "next/server"
import { connect } from '@/dbconfig/dbConfig'
import mongoose from 'mongoose'


export async function GET(req: NextRequest) {
    try {
        try {
            await mongoose.connect(process.env.MONGO_URI!)
        }
        catch (error: any) {
            return NextResponse.json({ error: error.message }, { status: 500 })
        }
        const retrievedEntries = await likedSong.findOne({})
        const likedSongs = await retrievedEntries.toArray()

        mongoose.disconnect()
        return NextResponse.json({ message: "songs retrived", likedSongs }, { status: 200 })
    } catch (error: any) {
        mongoose.disconnect()
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}