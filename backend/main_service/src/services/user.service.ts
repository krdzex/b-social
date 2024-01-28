import HttpError from "../utils/HttpError";
import {
  CreateUserRequest,
  CreateUserWithHashedPasswordDTO,
  SignInRequest,
} from "../dto/user.dto";
import { IUserRepository } from "../interface/userRepository.interface";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../modals/user.modal";

export class UserService {
  private _userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this._userRepository = userRepository;
  }

  async createUser(data: CreateUserRequest) {
    const user = await this._userRepository.findByEmail(data.email);

    if (user) {
      throw HttpError.BadRequest("User already exist");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const createUserDto = new CreateUserWithHashedPasswordDTO({
      firstName: data.firstName,
      lastName: data.lastName,
      username: data.username,
      email: data.email,
      hashedPassword: hashedPassword,
    });

    var createUserResult = await this._userRepository.create(createUserDto);

    return createUserResult;
  }

  async signIn(data: SignInRequest): Promise<{token: string, user: User}> {
    const user = await this._userRepository.findByEmail(data.email);
    if (!user) {
      throw HttpError.BadRequest("User not found");
    }

    const passwordMatch = await bcrypt.compare(
      data.password,
      user.password.trim()
    );

    if (!passwordMatch) {
      throw HttpError.BadRequest("Invalid password");
    }

    const token = jwt.sign(
      { user: {username: user.username} },
      process.env.JWT_SECRET!,
      {
        expiresIn: "1h",
      }
    );

    return {token, user};
  }
}
