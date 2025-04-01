import { IsInt, IsNotEmpty, Min } from 'class-validator'

export class NewspaperEntity {
  @IsInt()
  @Min(1)
  id: number

  @IsNotEmpty()
  title: string

  @IsNotEmpty()
  contents: string[]

  coverImage: string

  @IsInt()
  @Min(1)
  grade: number

  pdf: string
}
export class CreateNewsPaperDTO {
  @IsNotEmpty()
  title: string

  @IsNotEmpty()
  contents: string[]

  coverImage: string

  @IsInt()
  @Min(1)
  grade: number
}
