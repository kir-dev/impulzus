import prisma from '@/lib/prisma'
import { UserEntity } from '@/models/UserEntity'
import { NextApiResponse } from 'next'

export const GET = async (res: NextApiResponse<UserEntity | null>) => {
  const user = await prisma.user.findUnique({
    where: { id: '1' /*oldUser.id*/ }
  })
  /*return {
    ...user,
    jwt:
      user.isAdmin !== oldUser.isAdmin
        ? this.jwtService.sign(user, {
            secret: process.env.JWT_SECRET,
            expiresIn: '2 days',
          })
        : undefined,
  }*/
  res.status(200).json(user)
}
