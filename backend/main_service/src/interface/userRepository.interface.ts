import { CreateUserRequest } from "../dto/user.dto";
import { User } from "../modals/user.modal";

export interface IUserRepository {
  create(data: CreateUserRequest): Promise<User>;
}