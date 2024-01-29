import { CreateCommentRequest } from "../dto/comment.dto";
import { CreatePostDTO, CreatePostRequest } from "../dto/post.dto";
import { ICommentRepository } from "../interface/commentRepository.interface";
import { IPostRepository } from "../interface/postRepository.interface";
import { IUserRepository } from "../interface/userRepository.interface";
import HttpError from "../utils/HttpError";

export class CommentService {
  private _postRepository: IPostRepository;
  private _userRepository: IUserRepository;
  private _commentRepository: ICommentRepository;
  constructor(
    postRepository: IPostRepository,
    userRepository: IUserRepository,
    commentRepository: ICommentRepository
  ) {
    this._postRepository = postRepository;
    this._userRepository = userRepository;
    this._commentRepository = commentRepository;
  }

  async create(input: CreateCommentRequest, postId: number, userId: number) {
    var user = await this._userRepository.findById(userId);

    if (!user) {
      throw HttpError.NotFound("User not found");
    }

    var post = await this._postRepository.getById(postId);

    if (!post) {
      throw HttpError.NotFound("Post not found");
    }

    console.log();
    var createCommentResult = await this._commentRepository.create(
      input,
      postId,
      userId
    );

    return createCommentResult;
  }
}