import { IsNotEmpty, IsString } from "class-validator";
import { User } from "../modals/user.modal";

export class CreatePostRequest {
  @IsString({ message: "Post text should be string" })
  @IsNotEmpty({ message: "Post text is required" })
  text: string;
}

export class CreatePostDTO {
  text: string;
  constructor(data: { text: string }) {
    this.text = data.text;
  }
}
