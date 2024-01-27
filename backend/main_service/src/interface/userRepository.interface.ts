import { User } from "../modals/user.modal";

export interface IUserRepository {
  create(): Promise<User>;
}