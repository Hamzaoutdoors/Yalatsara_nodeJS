import mongoose, { Schema } from "mongoose";

const AgenceSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    cat: {
        type: String,
        required: true
    },
    about: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    logo: {
        type: String,
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
    },
    contacts: {
        whatsapp: { type: String },
        instagram: { type: String }
    },
    trips: {
        type: [String],
    },
    cheapest: {
        type: Number,
        required: true
    },
    featured: {
        type: Boolean,
        default: false
    }

})

export default mongoose.model("Agence", AgenceSchema);