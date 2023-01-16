import mongoose, { Schema } from "mongoose";

const TripSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    destination: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    details: {
        type: String,
        required: true,
    },
    featured: {
        type: Boolean,
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
    images: {
        type: [String],
        required: true,
    },
    maxMembers: {
        type: Number,
        required: true,
    },
    availableSeats: {
        type: Number,
    },
    agence: {
        type: mongoose.Schema.ObjectId,
        ref: 'Agence',
        required: true,
    },
    whatsappPost: {
        type: String,
    }
},
    { timestamps: true },
)

TripSchema.index({agence: 1}, {unique: true});

TripSchema.pre('remove', async function (next) {
    await this.model('Reservation').deleteMany({ trip: this._id });
});


export default mongoose.model("Trip", TripSchema);