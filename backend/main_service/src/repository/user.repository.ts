import { IUserRepository } from "../interface/userRepository.interface";
import { User } from "../modals/user.modal";

export class UserRepository implements IUserRepository {
  create(): Promise<User> {
    throw new Error("Method not implemented.");
  }
}
