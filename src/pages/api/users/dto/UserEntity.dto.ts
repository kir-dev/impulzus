import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsUUID } from 'class-validator'

export class UserEntity {
  id: string

  @IsUUID('all')
  authSchId: string

  @IsNotEmpty()
  fullName: string

  @IsEmail()
  email: string

  @IsBoolean()
  @IsOptional()
  isAdmin: boolean

  @IsOptional()
  picture?: string

  titles?: string[]
}
