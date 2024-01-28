import { PrismaClient } from "@prisma/client";
import { CreateUserWithHashedPasswordDTO } from "../dto/user.dto";
import { IUserRepository } from "../interface/userRepository.interface";
import { User } from "../modals/user.modal";

export class UserRepository implements IUserRepository {
  _prisma: PrismaClient;

  constructor() {
    this._prisma = new PrismaClient();
  }

  async create(data: CreateUserWithHashedPasswordDTO): Promise<User> {
    return this._prisma.user.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.username,
        email: data.email,
        password: data.hashedPassword,
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this._prisma.user.findFirst({
      where: { email },
    });

    return Promise.resolve(user);
  }
}
