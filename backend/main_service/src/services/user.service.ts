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

  async signIn(data: SignInRequest): Promise<{ token: string; user: User }> {
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

    const token = jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    return { token, user };
  }

  async followUser(userId: number, followingId: number) {
    const follower = await this._userRepository.findById(followingId);
    if (!follower) {
      throw HttpError.BadRequest("User not found");
    }

    await this._userRepository.follow(userId, followingId);
  }

  async unfollowUser(userId: number, followingId: number) {
    const follower = await this._userRepository.findById(followingId);
    if (!follower) {
      throw HttpError.BadRequest("User not found");
    }

    await this._userRepository.unfollow(userId, followingId);
  }

  async getUserById(id: number) {
    const user = await this._userRepository.findById(id);

    if (!user) {
      throw HttpError.NotFound("There is no user with this id");
    }

    return user;
  }

  async getFollowingPeople(userId: number) {
    const user = await this._userRepository.findById(userId);

    if (!user) {
      throw HttpError.NotFound("There is no user with this id");
    }

    const followingUsers = await this._userRepository.getFollowingPeople(
      userId
    );

    return followingUsers;
  }

  async getFollowers(userId: number) {
    const user = await this._userRepository.findById(userId);

    if (!user) {
      throw HttpError.NotFound("There is no user with this id");
    }

    const followers = await this._userRepository.getFollowers(userId);

    return followers;
  }

  async getAllUsers() {
    const users = await this._userRepository.getAll();

    return users;
  }

  async checkIfFollowing(userId: number, followingId: number) {
    const follower = await this._userRepository.findById(followingId);
    if (!follower) {
      throw HttpError.BadRequest("User not found");
    }

    var result = await this._userRepository.followExist(userId, followingId);

    return result;
  }
}
