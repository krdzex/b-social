export class Comment {
  constructor(
    public readonly id: Number,
    public readonly text: string,
    public readonly createdAt: Date
  ) {}
}
