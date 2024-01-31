import { CreatePostRequest } from "../dto/post.dto";
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

  async createPost(data: CreatePostRequest, userId: number) {
    var user = await this._userRepository.findById(userId);

    if (!user) {
      throw HttpError.NotFound("User not found");
    }

    var createUserResult = await this._postRepository.create(data.text, userId);

    return createUserResult;
  }

  async getPostFeed(userId: number, loggedUserId: number) {
    var user = await this._userRepository.findById(userId);

    if (!user) {
      throw HttpError.NotFound("User not found");
    }

    const checkIfFollowing = await this._userRepository.followExist(
      loggedUserId,
      userId
    );

    if (!checkIfFollowing && userId !== loggedUserId) {
      throw HttpError.BadRequest(
        "You need to follow this user first to see this users posts"
      );
    }

    var posts = await this._postRepository.getFeed(userId);

    return posts;
  }

  async deletePost(postId: number, userId: number) {
    var post = await this._postRepository.getById(postId);

    if (!post) {
      throw HttpError.NotFound("Post not found");
    }

    if (post.userId !== userId) {
      throw HttpError.BadRequest("You are not author of this post");
    }

    await this._postRepository.delete(postId);
  }
}
