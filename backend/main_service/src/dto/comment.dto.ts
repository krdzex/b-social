import { IsNotEmpty, IsString } from "class-validator";

export class CreateCommentRequest {
  @IsString({ message: "Comment text should be string" })
  @IsNotEmpty({ message: "Comment text is required" })
  text: string;
}
