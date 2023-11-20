import prisma from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
import { UserEntity } from '../../../models/UserEntity'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return handleGET(res)

    default:
      throw new Error(`The HTTP ${req.method} method is not supported at this route.`)
  }
}

const handleGET = async (res: NextApiResponse<UserEntity | null>) => {
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
