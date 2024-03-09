import connectToMongo from '@/dbconfig/musicDatabase'

import { NextRequest, NextResponse } from "next/server"
import mongoose from 'mongoose'

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json()
        const { albumId } = reqBody


        const [Csongs, Calbums, client] = await connectToMongo();
        const objectId = new mongoose.Types.ObjectId(albumId);

        const fetchedAlbum = await Calbums.findOne({ _id: objectId })
        console.log(fetchedAlbum)
        // const albumImage = fetchedAlbum.img
        const cursor = await Csongs.find({ album: fetchedAlbum._id })
        const allSongs = await cursor.toArray()
        client.close()
        // console.log(allSongs)
        return NextResponse.json({ message: "songs retrived", songs: allSongs, albumName: fetchedAlbum.album }, { status: 200 })
    } catch (error: any) {
        console.log(error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}