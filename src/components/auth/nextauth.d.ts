export interface IUser extends DefaultUser {
  isAdmin: boolean
  isBoardMember: boolean
  picture: string | null
  titles?: string[]
}
declare module 'next-auth' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface User extends IUser {}
  interface Session {
    user?: User
  }
}
declare module 'next-auth/jwt' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface JWT extends IUser {}
}
