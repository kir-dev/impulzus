import { IsInt, IsNotEmpty, Min } from 'class-validator'

export class CommentEntity {
  @IsInt()
  @Min(1)
  id: number

  @IsNotEmpty()
  content: string

  @IsInt()
  @Min(1)
  userId: string

  @IsInt()
  @Min(1)
  postId: number
}
