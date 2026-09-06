import { IsDateString, IsInt, IsNotEmpty, Min } from 'class-validator'

export class SolutionEntity {
  @IsInt()
  @Min(1)
  id: number

  @IsNotEmpty()
  title: string

  content?: string

  image?: string

  @IsDateString()
  createdAt: Date
}
export class CreateSolutionDTO {
  @IsNotEmpty()
  title: string

  content?: string

  image?: string
}
