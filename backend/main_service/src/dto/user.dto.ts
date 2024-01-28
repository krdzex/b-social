import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";
import { Match } from "../decorator/match.decorator";

export class CreateUserRequest {
  @IsString({ message: "First name should be string" })
  @IsNotEmpty({ message: "First name is required" })
  firstName: string;

  @IsString({ message: "Last name should be string" })
  @IsNotEmpty({ message: "Last name is required" })
  lastName: string;

  @IsString({ message: "Username should be string" })
  @IsNotEmpty({ message: "Username is required" })
  username: string;

  @IsString({ message: "Email should be string" })
  @IsNotEmpty({ message: "Email is required" })
  @IsEmail({}, { message: "Email is not in right format" })
  email: string;

  @IsString({ message: "Password should be string" })
  @IsNotEmpty({ message: "Password is required" })
  password: string;

  @IsString({ message: "Confirm Password name should be string" })
  @IsNotEmpty({ message: "Confirm Password is required" })
  @Match('password',{message: "Confirm password and password are not matching"})
  confirmPassword: string;
}

export class SignInRequest {
  email: string;
  password: string;
}

export class CreateUserWithHashedPasswordDTO {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  hashedPassword: string;

  constructor(data: {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    hashedPassword: string;
  }) {
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.username = data.username;
    this.email = data.email;
    this.hashedPassword = data.hashedPassword;
  }
}
