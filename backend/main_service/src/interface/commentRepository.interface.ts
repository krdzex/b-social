import { CommentForPostDto, CreateCommentRequest } from "../dto/comment.dto";

export interface ICommentRepository {
  create(
    data: CreateCommentRequest,
    postId: number,
    userId: number
  ): Promise<CommentForPostDto>;

  getCommentsForPost(postId: number): Promise<CommentForPostDto[]>;
  delete(commentId: number): Promise<void>;
  getById(commentId: number): Promise<CommentForPostDto | null>;
}
