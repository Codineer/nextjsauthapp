import mongoose from "mongoose";

const likedSongSchema = new mongoose.Schema(
    {
        song: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Song",
            required: [true, "song required"]
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "User required"]
        }

    }
)

const LikedSong = mongoose.models.LikedSong || mongoose.model("LikedSong", likedSongSchema); //
export default LikedSong;