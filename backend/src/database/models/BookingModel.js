import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    hotelId: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel", required: true },
    fromDate: { type: String, required: true },
    toDate: { type: String, required: true },
  },
  { timestamps: true }
);

export const BookingModel = mongoose.model("Booking", bookingSchema);
