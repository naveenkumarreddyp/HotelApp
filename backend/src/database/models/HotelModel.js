import mongoose from 'mongoose';

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  images: [{ type: String, required: true }]
}, { timestamps: true });

export const HotelModel = mongoose.model('Hotel', hotelSchema);