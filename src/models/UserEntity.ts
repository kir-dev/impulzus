import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsUUID } from 'class-validator'

export class UserEntity {
  @IsUUID('all')
  id: string

  @IsUUID('all')
  authSchId?: string | null | undefined

  @IsNotEmpty()
  name?: string | null | undefined

  @IsEmail()
  email?: string | null | undefined

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
