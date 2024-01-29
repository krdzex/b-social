import { Post, PrismaClient } from "@prisma/client";
import { IPostRepository } from "../interface/postRepository.interface";
import { CreatePostDTO } from "../dto/post.dto";
import { GetUserDto } from "../dto/user.dto";

export class PostRepository implements IPostRepository {
  _prisma: PrismaClient;

  constructor() {
    this._prisma = new PrismaClient();
  }

  async create(data: CreatePostDTO, user: GetUserDto): Promise<Post> {
    return this._prisma.post.create({
      data: {
        text: data.text,
        userId: user.id,
      },
    });
  }
}
