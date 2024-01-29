import { IsNotEmpty, IsString } from "class-validator";
import { UserForPostDto } from "./user.dto";

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

export class GetPostDto {
  id: number;
  text: string;
  user: UserForPostDto;
  createdAt: Date;
  _count: { comments: number };
}
