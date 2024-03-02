import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
            required: [true, "please provide a username"],
            unique: true,
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
        forgetPasswordExipiry: Date,
        verifyToken: String,
        verifyTokenExpiry: Date,
    }
)
const User = mongoose.models.User || mongoose.model("User", userSchema);
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10)
    next()
})
export default User;