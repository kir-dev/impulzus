import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsUUID } from 'class-validator'

export class UserEntity {
  @IsUUID('all')
  id: string

  @IsUUID('all')
  authSchId: string | null

  @IsNotEmpty()
  name: string

  @IsEmail()
  email: string

  @IsBoolean()
  @IsOptional()
  isAdmin: boolean

  @IsBoolean()
  @IsOptional()
  isBoardMember: boolean

  @IsOptional()
  picture: string | null

  titles?: string[]
}
