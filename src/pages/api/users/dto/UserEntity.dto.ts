import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsUUID } from 'class-validator'

export class UserEntity {
  id: string

  @IsUUID('all')
  authSchId: string | null

  @IsNotEmpty()
  fullName: string

  @IsEmail()
  email: string

  @IsBoolean()
  @IsOptional()
  isAdmin: boolean

  @IsOptional()
  picture: string | null

  titles?: string[]
}
