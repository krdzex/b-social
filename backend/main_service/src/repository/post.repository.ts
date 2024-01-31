import { Post, PrismaClient } from "@prisma/client";
import { IPostRepository } from "../interface/postRepository.interface";
import { GetPostDto } from "../dto/post.dto";

export class PostRepository implements IPostRepository {
  _prisma: PrismaClient;

  constructor() {
    this._prisma = new PrismaClient();
  }
  async delete(postId: number): Promise<void> {
    await this._prisma.post.delete({
      where: {
        id: postId,
      },
    });
  }

  async getById(postId: number): Promise<Post | null> {
    return await this._prisma.post.findFirst({
      where: {
        id: postId,
      },
    });
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
        _count: {
          select: { comments: true },
        },
      },
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async create(text: string, userId: number): Promise<GetPostDto> {
    return this._prisma.post.create({
      data: {
        text: text,
        userId: userId,
      },
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
        _count: {
          select: { comments: true },
        },
      },
    });
  }
}
