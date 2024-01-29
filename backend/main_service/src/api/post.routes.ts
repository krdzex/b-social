import express, { NextFunction, Request, Response } from "express";
import { UserRepository } from "../repository/user.repository";
import { RequestValidator } from "../utils/requestValidator";
import { CreatePostRequest } from "../dto/post.dto";
import { authGuard } from "../middlewares/auth.guard";
import { PostService } from "../services/post.service";
import { PostRepository } from "../repository/post.repository";

const router = express.Router();

export const postService = new PostService(
  new PostRepository(),
  new UserRepository()
);

router.post(
  "/post",
  authGuard,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { errors, input } = await RequestValidator(
        CreatePostRequest,
        req.body
      );

      const userId = req.user.id;

      if (errors)
        return res.jsonError({
          msg: "Validation Error",
          data: errors,
        });

      await postService.create(input, userId);

      return res.jsonSuccess({ status: 201 });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
