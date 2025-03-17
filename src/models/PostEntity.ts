import { IsDateString, IsInt, IsNotEmpty, Min } from 'class-validator'

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

  categories: string[]

  tag: string[]

  @IsDateString()
  createdAt: Date

  userId: string
}
export class createPostDto {
  title: string
  previewContent: string
  content: string
  categories: string[]
  tag: string[]
}
