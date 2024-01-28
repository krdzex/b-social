import { CreateUserWithHashedPasswordDTO } from "../dto/user.dto";
import { User } from "../modals/user.modal";

export interface IUserRepository {
  create(data: CreateUserWithHashedPasswordDTO): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
}
