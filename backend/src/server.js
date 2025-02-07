import express from "express";
import { ApolloServer } from "apollo-server-express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { typeDefs } from "./graphql/schema.js";
import { GraphQLResolver } from "./graphql/resolvers.js";
import { AuthService } from "./services/AuthService.js";
import { UserRepository } from "./repositories/UserRepository.js";
import { HotelRepository } from "./repositories/HotelRepository.js";
import { BookingRepository } from "./repositories/BookingRepository.js";
import { createLogger } from "./logger.js";

dotenv.config();

const logger = createLogger();

const app = express();
app.use(cors());

// Initialize repositories
const userRepository = new UserRepository();
const hotelRepository = new HotelRepository();
const bookingRepository = new BookingRepository();

// Initialize services
const authService = new AuthService(userRepository);

// Initialize GraphQL resolver
const resolver = new GraphQLResolver(authService, hotelRepository, bookingRepository);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    logger.info("Connected to MongoDB");
    return hotelRepository.seedHotels();
  })
  .then(() => logger.info("Initial data seeded"))
  .catch((err) => logger.error("MongoDB connection error:", err));

// Create Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers: resolver.getResolvers(),
  context: ({ req }) => {
    const token = req.headers.authorization?.split(" ")[1] || "";
    try {
      const user = token ? jwt.verify(token, process.env.JWT_SECRET) : null;
      return { user };
    } catch (err) {
      logger.error("JWT verification failed:", err);
      return { user: null };
    }
  },
  formatError: (error) => {
    logger.error("GraphQL Error:", error);
    return error;
  },
});

await server.start();
server.applyMiddleware({ app });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Server running at http://localhost:${PORT}${server.graphqlPath}`);
});
