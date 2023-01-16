import mongoose from 'mongoose';

const ReservationSchema = mongoose.Schema(
  {
    numOfPlaces: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'failed', 'paid', 'accepted', 'canceled'],
      default: 'pending',
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    trip: {
      type: mongoose.Schema.ObjectId,
      ref: 'Trip',
      required: true,
    },
    paymentIntentId: {
      type: String
    }
  },
  { timestamps: true }
);

ReservationSchema.index({trip: 1}, {unique: true});


export default mongoose.model("Reservation", ReservationSchema);