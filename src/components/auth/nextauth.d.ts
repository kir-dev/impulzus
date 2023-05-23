export interface IUser extends DefaultUser {
  isAdmin: boolean
  isBoardMember: boolean
  picture: string | null
  titles?: string[]
}
declare module 'next-auth' {
  interface User extends IUser {}
  interface Session {
    user?: User
  }
}
declare module 'next-auth/jwt' {
  interface JWT extends IUser {}
}
