import { CommentForPostDto, CreateCommentRequest } from "../dto/comment.dto";
import { Comment } from "../modals/comment.modal";

export interface ICommentRepository {
  create(
    data: CreateCommentRequest,
    postId: number,
    userId: number
  ): Promise<CommentForPostDto>;

  getCommentsForPost(postId: number): Promise<CommentForPostDto[]>;
  deleteComment(commentId: number): Promise<void>;
  getById(commentId: number): Promise<CommentForPostDto | null>;
}
