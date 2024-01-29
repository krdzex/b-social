import { User } from "./user.modal";

export class Comment {
  constructor(
    public readonly id: Number,
    public readonly text: string,
    public readonly createdAt: Date,
    public readonly author: User
  ) {}
}
