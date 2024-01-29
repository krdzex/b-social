import { PrismaClient } from "@prisma/client";
import { Comment } from "../modals/comment.modal";
import { CreateCommentRequest } from "../dto/comment.dto";
import { ICommentRepository } from "../interface/commentRepository.interface";

export class CommentRepository implements ICommentRepository {
  _prisma: PrismaClient;

  constructor() {
    this._prisma = new PrismaClient();
  }
  async create(
    data: CreateCommentRequest,
    postId: number,
    userId: number
  ): Promise<Comment> {
    return this._prisma.comment.create({
      data: {
        text: data.text,
        authorId: userId,
        postId: postId,
      },
    });
  }
}
