import { GetPostDto } from "../dto/post.dto";
import { Post } from "../modals/post.modal";

export interface IPostRepository {
  create(text: string, userId: number): Promise<GetPostDto>;
  getFeed(userId: number): Promise<GetPostDto[]>;
  getById(postId: number): Promise<Post | null>;
  delete(postId: number): Promise<void>;
}
