import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsUUID } from 'class-validator'

export class UserEntity {
  @IsUUID('all')
  id: string

  @IsUUID('all')
  authSchId?: string | null | undefined

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

  @IsOptional()
  @IsBoolean()
  isMember: boolean
}
export class CreateUserDto {
  @IsNotEmpty()
  name: string

  @IsEmail()
  email: string

  @IsBoolean()
  isAdmin: boolean

  @IsBoolean()
  isBoardMember: boolean

  @IsOptional()
  picture: string | null

  titles?: string[]
}
