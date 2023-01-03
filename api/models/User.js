import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        maxlength: 50,
        minlength: 3,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',
        ],
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    city: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
},
    { timestamps: true }
)

UserSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (canditatePassword)  {
    const isMatch = await bcrypt.compare(canditatePassword, this.password);
    return isMatch;
};

export default mongoose.model("User", UserSchema)