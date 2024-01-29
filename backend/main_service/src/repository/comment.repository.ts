import { PrismaClient } from "@prisma/client";
import { Comment } from "../modals/comment.modal";
import { CommentForPostDto, CreateCommentRequest } from "../dto/comment.dto";
import { ICommentRepository } from "../interface/commentRepository.interface";

export class CommentRepository implements ICommentRepository {
  _prisma: PrismaClient;

  constructor() {
    this._prisma = new PrismaClient();
  }
  async getById(commentId: number): Promise<CommentForPostDto | null> {
    return this._prisma.comment.findFirst({
      select: {
        id: true,
        text: true,
        author: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            username: true,
          },
        },
        createdAt: true,
      },
      where: {
        id: commentId,
      },
    });
  }

  async deleteComment(commentId: number): Promise<void> {
    await this._prisma.comment.delete({
      where: {
        id: commentId,
      },
    });
  }

  async create(
    data: CreateCommentRequest,
    postId: number,
    userId: number
  ): Promise<CommentForPostDto> {
    return this._prisma.comment.create({
      data: {
        text: data.text,
        authorId: userId,
        postId: postId,
      },
      select: {
        id: true,
        text: true,
        author: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            username: true,
          },
        },
        createdAt: true,
      },
    });
  }

  async getCommentsForPost(postId: number): Promise<CommentForPostDto[]> {
    return this._prisma.comment.findMany({
      select: {
        id: true,
        text: true,
        author: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            username: true,
          },
        },
        createdAt: true,
      },
    });
  }
}
