import { BookingModel } from "../database/models/BookingModel.js";
import { Booking } from "../entities/Booking.js";

export class BookingRepository {
  async createBooking(bookingData) {
    let alredyBooked = await this.findOverlappingBookings(bookingData.hotelId.toString(), bookingData.fromDate, bookingData.toDate);
    // console.log("----alredyBooked---", alredyBooked);
    if (alredyBooked.length > 0) {
      throw Error("Hotel already booked by someone on selected dates");
    }
    const booking = await BookingModel.create(bookingData);
    return new Booking({
      id: booking._id.toString(),
      userId: booking.userId.toString(),
      hotelId: booking.hotelId.toString(),
      fromDate: booking.fromDate,
      toDate: booking.toDate,
    });
  }

  async findByUserId(userId) {
    const bookings = await BookingModel.find({ userId }).populate("hotelId");
    return bookings.map(
      (booking) =>
        new Booking({
          id: booking._id.toString(),
          userId: booking.userId.toString(),
          hotelId: booking.hotelId._id.toString(),
          fromDate: booking.fromDate,
          toDate: booking.toDate,
        })
    );
  }

  async findOverlappingBookings(hotelId, fromDate, toDate) {
    return await BookingModel.find({
      hotelId,
      $or: [
        {
          fromDate: { $lte: fromDate },
          toDate: { $gte: fromDate },
        },
        {
          fromDate: { $lte: toDate },
          toDate: { $gte: toDate },
        },
      ],
    });
  }
}
