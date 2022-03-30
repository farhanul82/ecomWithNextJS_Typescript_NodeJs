import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },


    password: {
        type: String,
        required: true,
    },

    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
    }

}, {
    timestamps: true,
})

const User = mongoose.model('User', UserSchema)

export default User