import { PrismaClient } from "@prisma/client";
import {
  CreateUserWithHashedPasswordDTO,
  GetFollowingUser,
  GetUserDto,
} from "../dto/user.dto";
import { IUserRepository } from "../interface/userRepository.interface";
import { User } from "../modals/user.modal";

export class UserRepository implements IUserRepository {
  _prisma: PrismaClient;

  constructor() {
    this._prisma = new PrismaClient();
  }

  async follow(userId: number, followingId: number): Promise<void> {
    await this._prisma.follow.create({
      data: {
        followerId: userId,
        followingId: followingId,
      },
    });
  }

  async getFollowingPeople(userId: number): Promise<GetFollowingUser[]> {
    const followRelations = await this._prisma.follow.findMany({
      where: {
        followerId: userId,
      },
      include: {
        following: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    return followRelations.map((relation) => relation.following);
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
    return await this._prisma.user.findFirst({
      where: { email },
    });
  }

  async findById(id: number): Promise<GetUserDto | null> {
    return await this._prisma.user.findFirst({
      where: { id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        username: true,
        createdAt: true,
      },
    });
  }
}
