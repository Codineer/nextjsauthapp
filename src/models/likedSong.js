import mongoose from "mongoose";

const likedSongSchema = new Schema(
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

const LikedSong = mongoose.models.User || mongoose.model("User", userSchema);
export default LikedSong;