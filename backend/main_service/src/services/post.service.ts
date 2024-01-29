import { CreatePostDTO, CreatePostRequest } from "../dto/post.dto";
import { IPostRepository } from "../interface/postRepository.interface";
import { IUserRepository } from "../interface/userRepository.interface";
import HttpError from "../utils/HttpError";

export class PostService {
  private _postRepository: IPostRepository;
  private _userRepository: IUserRepository;

  constructor(
    postRepository: IPostRepository,
    userRepository: IUserRepository
  ) {
    this._postRepository = postRepository;
    this._userRepository = userRepository;
  }

  async create(data: CreatePostRequest, userId: number) {
    var user = await this._userRepository.findById(userId);

    if (!user) {
      throw HttpError.NotFound("User not found");
    }

    const createPostDto = new CreatePostDTO({
      text: data.text,
    });

    var createUserResult = await this._postRepository.create(
      createPostDto,
      user
    );

    return createUserResult;
  }

  async getPostFeed(userId: number) {
    var posts = await this._postRepository.getFeed(userId);

    return posts;
  }
}
