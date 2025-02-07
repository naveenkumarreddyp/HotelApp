import { UserModel } from "../database/models/UserModel.js";
import { User } from "../entities/User.js";

export class UserRepository {
  async create(userData) {
    const user = await UserModel.create(userData);
    return new User({
      id: user._id.toString(),
      email: user.email,
      password: user.password,
    });
  }

  async findByEmail(email) {
    const user = await UserModel.findOne({ email });
    return user
      ? new User({
          id: user._id.toString(),
          email: user.email,
          password: user.password,
        })
      : null;
  }

  async findById(id) {
    const user = await UserModel.findById(id);
    return user
      ? new User({
          id: user._id.toString(),
          email: user.email,
          password: user.password,
        })
      : null;
  }
}
