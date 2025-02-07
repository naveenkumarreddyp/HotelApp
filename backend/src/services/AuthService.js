import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../entities/User.js";

export class AuthService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async register(input) {
    const user = new User({
      email: input.email,
      password: input.password,
    });
    user.validate();

    const existingUser = await this.userRepository.findByEmail(input.email);
    if (existingUser) {
      throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(input.password, 10);
    const createdUser = await this.userRepository.create({
      ...input,
      password: hashedPassword,
    });

    const token = this._generateToken(createdUser.id);

    return {
      token,
      user: {
        id: createdUser.id,
        email: createdUser.email,
      },
    };
  }

  async login(input) {
    const user = await this.userRepository.findByEmail(input.email);
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const validPassword = await bcrypt.compare(input.password, user.password);
    if (!validPassword) {
      throw new Error("Invalid credentials");
    }

    const token = this._generateToken(user.id);

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
      },
    };
  }

  _generateToken(userId) {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1d" });
  }
}
