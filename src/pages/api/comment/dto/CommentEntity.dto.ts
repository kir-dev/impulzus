import { IsInt, IsNotEmpty, Min } from 'class-validator'
import { PostEntity } from '../../post/dto/PostEntity.dto'
import { UserEntity } from '../../user/dto/UserEntity.dto'

export class CommentEntity {
  @IsInt()
  @Min(1)
  id: number

  @IsNotEmpty()
  content: String

  user: UserEntity

  post: PostEntity
}
