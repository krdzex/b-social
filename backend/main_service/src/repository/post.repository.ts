import { Post, PrismaClient } from "@prisma/client";
import { IPostRepository } from "../interface/postRepository.interface";
import { CreatePostDTO, GetPostDto } from "../dto/post.dto";
import { GetUserDto } from "../dto/user.dto";

export class PostRepository implements IPostRepository {
  _prisma: PrismaClient;

  constructor() {
    this._prisma = new PrismaClient();
  }
  async getFeed(userId: number): Promise<GetPostDto[]> {
    return await this._prisma.post.findMany({
      select: {
        id: true,
        text: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            username: true,
          },
        },
      },
      where: {
        userId,
      },
    });
  }

  async create(data: CreatePostDTO, user: GetUserDto): Promise<Post> {
    return this._prisma.post.create({
      data: {
        text: data.text,
        userId: user.id,
      },
    });
  }
}
