import mongoose from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
            required: [true, "please provide a username"],
            // unique: true,
        },
        email: {
            type: String,
            required: [true, "please provide a email"],
            unique: true,
        },
        password: {
            type: String,
            required: [true, "please provide a password"],
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        isAdmin: {
            type: Boolean,
            default: false
        },
        forgetPasswordToken: String,
        forgetPasswordExpiry: Date,
        verifyToken: String,
        verifyTokenExpiry: Date,
    }
)
userSchema.methods.isPasswordCorrect = async function (password) {

    return await bcrypt.compare(password, this.password)
}
userSchema.pre("save", async function (next) {

    console.log("covering")
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;