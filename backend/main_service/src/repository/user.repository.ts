import { PrismaClient } from "@prisma/client";
import {
  CreateUserWithHashedPasswordDTO,
  GetFollowerUser,
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

  async findByUsername(username: string): Promise<User | null> {
    return await this._prisma.user.findFirst({
      where: { username },
    });
  }

  async followExist(userId: number, followingId: number): Promise<boolean> {
    const followExists = await this._prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId: userId,
          followingId: followingId,
        },
      },
    });

    return !!followExists;
  }

  async getAll(): Promise<GetUserDto[]> {
    return await this._prisma.user.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        username: true,
        email: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async follow(userId: number, followingId: number): Promise<void> {
    await this._prisma.follow.create({
      data: {
        followerId: userId,
        followingId: followingId,
      },
    });
  }

  async unfollow(userId: number, followingId: number): Promise<void> {
    await this._prisma.follow.delete({
      where: {
        followerId_followingId: {
          followerId: userId,
          followingId: followingId,
        },
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

  async getFollowers(userId: number): Promise<GetFollowerUser[]> {
    return await this._prisma.follow
      .findMany({
        where: {
          followingId: userId,
        },
        select: {
          follower: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
            },
          },
        },
      })
      .then((follows) => follows.map((follow) => follow.follower));
  }

  async create(data: CreateUserWithHashedPasswordDTO): Promise<User> {
    return this._prisma.user.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.username,
        email: data.email,
        password: data.hashedPassword
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
