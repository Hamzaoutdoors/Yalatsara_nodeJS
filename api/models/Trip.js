import mongoose, { Schema } from "mongoose";

const TripSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    desc: {
        type: String,
        required: true,
    },
    dateStart: {
        type: Date,
        required: true,
    },
    dateEnd: {
        type: Date,
        required: true,
    },
    maxMembers: {
        type: Number,
        required: true,
    }
},
{ timestamps: true },
)

export default mongoose.model("Trip", TripSchema);