import { Post } from "@prisma/client";
import { CreatePostDTO, GetPostDto } from "../dto/post.dto";
import { GetUserDto } from "../dto/user.dto";

export interface IPostRepository {
  create(data: CreatePostDTO, user: GetUserDto): Promise<Post>;
  getFeed(userId: number): Promise<GetPostDto[]>;
}
