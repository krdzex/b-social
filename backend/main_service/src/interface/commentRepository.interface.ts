import { CreateCommentRequest } from "../dto/comment.dto";
import { Comment } from "../modals/comment.modal";

export interface ICommentRepository {
  create(
    data: CreateCommentRequest,
    postId: number,
    userId: number
  ): Promise<Comment>;
}
