import express, { NextFunction, Request, Response } from "express";
import { UserRepository } from "../repository/user.repository";
import { UserService } from "../services/user.service";

const router = express.Router();

export const userService = new UserService(new UserRepository());

router.post(
  "/register",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await userService.createUser(req.body);

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
      const token = await userService.signIn(req.body);

      return res.jsonSuccess({ data: token });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
