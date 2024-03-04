import connectToMongo from '@/dbconfig/musicDatabase'

import { NextRequest, NextResponse } from "next/server"


export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json()
        const { album } = reqBody
        const [Csongs, Calbums] = await connectToMongo();

        const fetchedAlbum = await Calbums.findOne({ album })
        const albumImage = fetchedAlbum.img
        const cursor = await Csongs.find({ album: fetchedAlbum._id })
        const allSongs = await cursor.toArray()
        // console.log(allSongs)
        return NextResponse.json({ message: "songs retrived", albumImage, songs: allSongs }, { status: 200 })
    } catch (error: any) {
        NextResponse.json({ error: error.message }, { status: 500 })
    }
}