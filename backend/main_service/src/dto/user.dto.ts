export class CreateUserRequest {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
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
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    hashedPassword: string
  }) {
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.username = data.username;
    this.email = data.email;
    this.hashedPassword = data.hashedPassword;
  }
}
