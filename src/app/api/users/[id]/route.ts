import prisma from '@/lib/prisma'
import { UserEntity } from '@/models/UserEntity'
import { NextApiRequest, NextApiResponse } from 'next'
import { NotFoundException } from 'next-api-decorators'

export const GET = async (userId: unknown, res: NextApiResponse<UserEntity | null>) => {
  const user = await prisma.user.findUnique({
    where: { id: userId?.toString() }
  })
  if (!user) {
    throw new NotFoundException()
  }
  return res.status(200).json(user)
}

export const PATCH = async (userId: unknown, req: NextApiRequest, res: NextApiResponse<UserEntity>) => {
  const user = await prisma.user.update({
    where: { id: userId?.toString() },
    data: req.body
  })
  return res.status(200).json(user)
}

export const DELETE = async (userId: unknown, res: NextApiResponse<UserEntity>) => {
  const user = await prisma.user.delete({
    where: { id: userId?.toString() }
  })
  return res.status(200).json(user)
}
