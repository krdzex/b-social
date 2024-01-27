import express, { NextFunction, Request, Response } from "express";
import { UserRepository } from "../repository/user.repository";
import { UserService } from "../services/user.service";

const router = express.Router();

export const userService = new UserService(new UserRepository());

router.post(
  "/register",
  async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({})
  }
);

export default router;
