import HttpError from "../utils/HttpError";
import {
  CreateUserRequest,
  CreateUserWithHashedPasswordDTO,
} from "../dto/user.dto";
import { IUserRepository } from "../interface/userRepository.interface";
import bcryptjs from "bcryptjs";

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

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(data.password, salt);

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
}
