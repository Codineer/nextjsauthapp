import { NextRequest, NextResponse } from "next/server";
import LikedSong from "@/models/likedSong";
import mongoose from "mongoose";
mongoose.connect(process.env.MONGO_URI!).then(() => {
    console.log('Database connected');
}).catch(error => {
    console.error('Error connecting to database:', error.message);
});
export async function POST(req: NextRequest) {
    try {

        const { currentSongInfo, uid } = await req.json()
        if (uid === "") {
            return NextResponse.json({}, { status: 200 })
        }

        const fetchedData = await LikedSong.findOne({ user: uid, song: currentSongInfo._id })
        if (fetchedData) {
            return NextResponse.json({ message: "song already liked" }, { status: 200 })
        }
        const newEntry = await LikedSong.create({

            song: currentSongInfo._id,
            user: uid,
        })


        return NextResponse.json({ message: newEntry, value: true }, { status: 200 })
    } catch (err) {

        return NextResponse.json({ error: "internal server error" }, { status: 500 })
    }
    finally {

    }
}
process.on('exit', async () => {
    await mongoose.disconnect();
    console.log('Database connection closed');
});