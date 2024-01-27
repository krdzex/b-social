import { CreateUserRequest } from "../dto/user.dto";
import { IUserRepository } from "../interface/userRepository.interface";
import { User } from "../modals/user.modal";

export class UserRepository implements IUserRepository {
  create(data: CreateUserRequest): Promise<User> {
    throw new Error("Method not implemented.");
  }
}
