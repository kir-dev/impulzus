import { IsInt, IsNotEmpty, Min } from 'class-validator'

export class NewspaperEntity {
  @IsInt()
  @Min(1)
  id: number

  @IsNotEmpty()
  title: string

  @IsNotEmpty()
  contents: string[]

  ISSUU_Link: string | null

  coverImage: string | null

  @IsInt()
  @Min(1)
  grade: number

  pdf: string
}
