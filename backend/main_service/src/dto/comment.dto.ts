import { IsNotEmpty, IsString } from "class-validator";
import { UserForPostDto } from "./user.dto";

export class CreateCommentRequest {
  @IsString({ message: "Comment text should be string" })
  @IsNotEmpty({ message: "Comment text is required" })
  text: string;
}

export class CommentForPostDto {
  id: number;
  text: string;
  author: UserForPostDto;
  createdAt: Date;
}
