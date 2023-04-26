import prisma from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
import { UserEntity } from './dto/UserEntity.dto'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const userId = req.query.id

  switch (req.method) {
    case 'GET':
      return handleGET(userId, res)

    case 'DELETE':
      return handleDELETE(userId, res)

    case 'PATCH':
      handlePATCH(userId, req, res)

    default:
      throw new Error(`The HTTP ${req.method} method is not supported at this route.`)
  }
}

const handleGET = async (userId: unknown, res: NextApiResponse<UserEntity | null>) => {
  const user = await prisma.user.findUnique({
    where: { id: userId?.toString() }
  })
  return res.status(200).json(user)
}

const handlePATCH = async (userId: unknown, req: NextApiRequest, res: NextApiResponse<UserEntity>) => {
  const user = await prisma.user.update({
    where: { id: userId?.toString() },
    data: req.body
  })
  return res.status(200).json(user)
}

const handleDELETE = async (userId: unknown, res: NextApiResponse<UserEntity>) => {
  const user = await prisma.user.delete({
    where: { id: userId?.toString() }
  })
  return res.status(200).json(user)
}
