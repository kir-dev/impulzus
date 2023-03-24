import prisma from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
import { UserData } from '.'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const userId = req.query.id

  switch (req.method) {
    case 'GET':
      return handleGET(userId, res)

    case 'DELETE':
      return handleDELETE(userId, res)

    default:
      throw new Error(`The HTTP ${req.method} method is not supported at this route.`)
  }
}

const handleGET = async (userId: unknown, res: NextApiResponse<UserData | null>) => {
  const user = await prisma.user.findUnique({
    where: { id: Number(userId) }
  })
  return res.status(200).json(user)
}

const handleDELETE = async (userId: unknown, res: NextApiResponse<UserData>) => {
  const user = await prisma.user.delete({
    where: { id: Number(userId) }
  })
  return res.status(200).json(user)
}
