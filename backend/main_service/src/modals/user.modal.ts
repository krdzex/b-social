export class User {
  constructor(
    public readonly id: Number,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly username: string,
    public readonly email: string,
    public readonly password: string
  ) {}
}
