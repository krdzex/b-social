import {
  CreateUserWithHashedPasswordDTO,
  GetFollowerUser,
  GetFollowingUser,
  GetUserDto,
} from "../dto/user.dto";
import { User } from "../modals/user.modal";

export interface IUserRepository {
  create(data: CreateUserWithHashedPasswordDTO): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: number): Promise<GetUserDto | null>;
  follow(userId: number, followingId: number): Promise<void>;
  getFollowingPeople(userId: number): Promise<GetFollowingUser[]>;
  getFollowers(userId: number): Promise<GetFollowerUser[]>;
}
