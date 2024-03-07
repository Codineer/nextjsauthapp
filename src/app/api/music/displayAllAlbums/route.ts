import connectToMongo from '@/dbconfig/musicDatabase'

import { NextRequest, NextResponse } from "next/server"


export async function POST(req: NextRequest) {
    try {
        const [Csongs, Calbums, client] = await connectToMongo();

        const fetchedAlbum = await Calbums.find({})
        const allAllbums = await fetchedAlbum.toArray()
        // console.log(allSongs)
        client.close()
        return NextResponse.json({ message: "songs retrived", albums: allAllbums }, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}