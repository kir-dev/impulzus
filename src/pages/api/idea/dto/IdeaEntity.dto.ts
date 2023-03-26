import { IsInt, IsNotEmpty, Min } from 'class-validator'

export class IdeaEntity {
  @IsInt()
  @Min(1)
  id: number

  @IsNotEmpty()
  description: string
}
