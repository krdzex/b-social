import express, { NextFunction, Request, Response } from "express";
import { UserRepository } from "../repository/user.repository";
import { authGuard } from "../middlewares/auth.guard";
import { PostRepository } from "../repository/post.repository";
import { CommentService } from "../services/comment.service";
import { RequestValidator } from "../utils/requestValidator";
import { CreateCommentRequest } from "../dto/comment.dto";
import { CommentRepository } from "../repository/comment.repository";

const router = express.Router();

export const commentService = new CommentService(
  new PostRepository(),
  new UserRepository(),
  new CommentRepository()
);

router.post(
  "/posts/:postId/comments",
  authGuard,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { errors, input } = await RequestValidator(
        CreateCommentRequest,
        req.body
      );

      if (errors) {
        return res.jsonError({
          msg: "Validation Error",
          data: errors,
        });
      }

      const postId = Number(req.params.postId);
      const userId = req.user.id;

      var createCommentResult = await commentService.createComment(
        input,
        postId,
        userId
      );

      return res.jsonSuccess({ status: 201, data: createCommentResult });
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/posts/:postId/comments",
  authGuard,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const postId = Number(req.params.postId);
      const loggedUserId = req.user.id;

      var comments = await commentService.getCommentsForPost(
        postId,
        loggedUserId
      );

      return res.jsonSuccess({ data: comments });
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/comments/:commentId",
  authGuard,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const commentId = Number(req.params.commentId);
      const userId = req.user.id;

      await commentService.deleteComment(commentId, userId);

      return res.jsonSuccess({ status: 201 });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
