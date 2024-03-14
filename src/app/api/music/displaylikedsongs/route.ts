import likedSong from '@/models/likedSong.js'
import { NextRequest, NextResponse } from "next/server"
import mongoose from 'mongoose'
import { MongoClient, Db, Collection } from 'mongodb';


export async function POST(req: NextRequest) {
    try {

        // await mongoose.connect(process.env.MONGO_URI!)
        const client: MongoClient = await MongoClient.connect(process.env.MONGO_URI!);
        const db: Db = client.db("test");
        const songs = db.collection("songs");

        const { uid } = await req.json()
        const retrievedEntries = await likedSong.find({ user: uid })
        const songsreq: any = []
        for (const entry of retrievedEntries) {
            const fetchedsong = await songs.findOne({ _id: entry.song })
            songsreq.push(fetchedsong)
        }

        return NextResponse.json({ message: "songs retrived", likedSongs: songsreq }, { status: 200 })
    } catch (error: any) {

        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
process.on('exit', async () => {
    await mongoose.disconnect();
    console.log('Database connection closed');
});