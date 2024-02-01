export class Post {
  constructor(
    public readonly id: Number,
    public readonly text: string,
    public readonly createdAt: Date,
    public readonly userId: number
  ) {}
}
