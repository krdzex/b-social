import { Post } from "@prisma/client";
import { CreatePostDTO } from "../dto/post.dto";
import { GetUserDto } from "../dto/user.dto";

export interface IPostRepository {
  create(data: CreatePostDTO, user: GetUserDto): Promise<Post>;
}
