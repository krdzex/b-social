import express, { NextFunction, Request, Response } from "express";
import { UserRepository } from "../repository/user.repository";
import { UserService } from "../services/user.service";

const router = express.Router();

export const userService = new UserService(new UserRepository());

router.post(
  "/register",
  async (req: Request, res: Response, next: NextFunction) => {
    try {

      const data = await userService.createUser(req.body);
      
      return res.status(201).json(data);
    } catch (error) {
      const err = error as Error;
      return res.status(500).json(err.message);
    }
  }
);

export default router;
