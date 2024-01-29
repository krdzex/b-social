import express, { NextFunction, Request, Response } from "express";
import { UserRepository } from "../repository/user.repository";
import { UserService } from "../services/user.service";
import { RequestValidator } from "../utils/requestValidator";
import { CreateUserRequest } from "../dto/user.dto";

const router = express.Router();

export const userService = new UserService(new UserRepository());

router.post(
  "/register",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { errors, input } = await RequestValidator(
        CreateUserRequest,
        req.body
      );

      if (errors)
        return res.jsonError({
          msg: "Validation Error",
          data: errors,
        });

      await userService.createUser(input);

      return res.jsonSuccess({ status: 201 });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/signin",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await userService.signIn(req.body);

      return res.jsonSuccess({
        data: {
          token: result.token,
          user: {
            id: result.user.id,
            username: result.user.username,
            email: result.user.email,
          },
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/user/:userId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = Number(req.params.userId);

      console.log(userId);
      const result = await userService.getUserById(userId);

      console.log(result)
      return res.jsonSuccess({ data: result });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
