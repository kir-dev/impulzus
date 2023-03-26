import { IsDateString, IsInt, IsNotEmpty, Min } from 'class-validator'
import { CommentEntity } from '../../comment/dto/CommentEntity.dto'
import { UserEntity } from '../../user/dto/UserEntity.dto'

export class PostEntity {
  @IsInt()
  @Min(1)
  id: number

  @IsNotEmpty()
  title: string

  @IsNotEmpty()
  previewContent: string

  @IsNotEmpty()
  content: string

  type: string[]

  tag: string[]

  @IsDateString()
  date: Date

  user: UserEntity

  comments: CommentEntity[]
}
