import { CreateUserRequest } from "../dto/user.dto";
import { IUserRepository } from "../interface/userRepository.interface";

export class UserService {
  private _repository: IUserRepository;

  constructor(repository: IUserRepository) {
    this._repository = repository;
  }

  async createUser(data: CreateUserRequest) {
    return data;
  }
}
