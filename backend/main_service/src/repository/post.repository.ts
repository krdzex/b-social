import { PrismaClient } from "@prisma/client";
import { IPostRepository } from "../interface/postRepository.interface";
import { GetPostDto } from "../dto/post.dto";
import { Post } from "../modals/post.modal";
import { PaginateOptions } from "../dto/pagination/pagination-options";
import { PaginatedResult } from "../dto/pagination/pagination-result";
import { paginate } from "../dto/pagination/paginator";

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

  async getFeed(
    userId: number,
    paginationOptions: PaginateOptions
  ): Promise<PaginatedResult<GetPostDto[]>> {
    const select = {
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
    };

    const where = {
      userId: userId,
    };

    return paginate(this._prisma.post, paginationOptions, select, where);
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
