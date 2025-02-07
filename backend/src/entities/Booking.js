export class Booking {
  constructor({ id, userId, hotelId, fromDate, toDate }) {
    this.id = id;
    this.userId = userId;
    this.hotelId = hotelId;
    this.fromDate = fromDate;
    this.toDate = toDate;
  }

  validate() {
    if (!this.userId || !this.hotelId || !this.fromDate || !this.toDate) {
      throw new Error('Invalid booking data');
    }
    if (new Date(this.fromDate) >= new Date(this.toDate)) {
      throw new Error('Invalid date range');
    }
  }
}