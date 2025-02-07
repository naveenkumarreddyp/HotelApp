export const typeDefs = `#graphql
  type Hotel {
    id: ID!
    name: String!
    description: String!
    price: Float!
    images: [String!]!
  }

  type User {
    id: ID!
    email: String!
  }

  type Booking {
    id: ID!
    userId: ID!
    hotelId: ID!
    fromDate: String!
    toDate: String!
    hotel: Hotel!
    user: User!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  input CreateBookingInput {
    hotelId: ID!
    fromDate: String!
    toDate: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input RegisterInput {
    email: String!
    password: String!
  }

  type Query {
    hotels: [Hotel!]!
    hotel(id: ID!): Hotel
    userBookings: [Booking!]!
  }

  type Mutation {
    login(input: LoginInput!): AuthPayload!
    register(input: RegisterInput!): AuthPayload!
    createBooking(input: CreateBookingInput!): Booking!
  }
`;