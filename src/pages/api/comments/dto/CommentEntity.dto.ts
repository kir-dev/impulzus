import { IsInt, IsNotEmpty, Min } from 'class-validator'

export class CommentEntity {
  @IsInt()
  @Min(1)
  id: number

  @IsNotEmpty()
  content: String

  @IsInt()
  @Min(1)
  userId: number

  @IsInt()
  @Min(1)
  postId: number
}
