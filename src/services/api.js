import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { gql } from "@apollo/client";

const httpLink = createHttpLink({
  uri: "http://localhost:3000/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const LOGIN_MUTATION = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      token
      user {
        id
        email
      }
    }
  }
`;

const REGISTER_MUTATION = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      token
      user {
        id
        email
      }
    }
  }
`;

const GET_HOTELS = gql`
  query GetHotels {
    hotels {
      id
      name
      description
      price
      images
    }
  }
`;

const GET_HOTEL = gql`
  query GetHotel($id: ID!) {
    hotel(id: $id) {
      id
      name
      description
      price
      images
    }
  }
`;

const CREATE_BOOKING = gql`
  mutation CreateBooking($input: CreateBookingInput!) {
    createBooking(input: $input) {
      id
      fromDate
      toDate
      hotel {
        id
        name
        price
      }
    }
  }
`;

const GET_USER_BOOKINGS = gql`
  query GetUserBookings {
    userBookings {
      id
      fromDate
      toDate
      hotel {
        id
        name
        price
        images
      }
    }
  }
`;

export const api = {
  login: async (email, password) => {
    const { data } = await client.mutate({
      mutation: LOGIN_MUTATION,
      variables: { input: { email, password } },
    });
    localStorage.setItem("token", data.login.token);
    return data.login;
  },

  register: async (email, password) => {
    const { data } = await client.mutate({
      mutation: REGISTER_MUTATION,
      variables: { input: { email, password } },
    });
    return data.register;
  },

  getHotels: async () => {
    const { data } = await client.query({ query: GET_HOTELS });
    return data.hotels;
  },

  getHotelById: async (id) => {
    const { data } = await client.query({
      query: GET_HOTEL,
      variables: { id },
    });
    return data.hotel;
  },

  bookHotel: async (hotelId, fromDate, toDate) => {
    const { data } = await client.mutate({
      mutation: CREATE_BOOKING,
      variables: {
        input: { hotelId, fromDate, toDate },
      },
    });
    return data.createBooking;
  },

  getUserBookings: async () => {
    const { data } = await client.query({
      query: GET_USER_BOOKINGS,
      fetchPolicy: "network-only",
    });
    return data.userBookings;
  },
};
