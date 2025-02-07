export class GraphQLResolver {
  constructor(authService, hotelService, bookingService) {
    this.authService = authService;
    this.hotelService = hotelService;
    this.bookingService = bookingService;
  }

  getResolvers() {
    return {
      Query: {
        hotels: () => this.hotelService.findAll(),
        hotel: (_, { id }) => this.hotelService.findById(id),
        userBookings: (_, __, { user }) => {
          if (!user) throw new Error("Not authenticated");
          return this.bookingService.findByUserId(user.userId);
        },
      },

      Mutation: {
        register: (_, { input }) => this.authService.register(input),
        login: (_, { input }) => this.authService.login(input),
        createBooking: (_, { input }, { user }) => {
          if (!user) throw new Error("Not authenticated");
          return this.bookingService.createBooking({ userId: user.userId, ...input });
        },
      },

      Booking: {
        hotel: (booking) => this.hotelService.findById(booking.hotelId),
        user: (booking) => this.userService.findById(booking.userId),
      },
    };
  }
}
