import { IsBoolean, IsEmail, IsInt, IsNotEmpty, IsOptional, IsUUID, Min } from 'class-validator'

export class UserEntity {
  @IsInt()
  @Min(1)
  id: number

  @IsUUID('all')
  authSchId: string

  @IsNotEmpty()
  fullName: string

  @IsEmail()
  email: string

  @IsBoolean()
  @IsOptional()
  isAdmin: boolean
}
