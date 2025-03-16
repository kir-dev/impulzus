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
  return new Response(JSON.stringify(user), { status: 200 })
}

export const PATCH = async (userId: unknown, req: NextApiRequest, res: NextApiResponse<UserEntity>) => {
  const user = await prisma.user.update({
    where: { id: userId?.toString() },
    data: req.body
  })
  return new Response(JSON.stringify(user), { status: 200 })
}

export const DELETE = async (userId: unknown, res: NextApiResponse<UserEntity>) => {
  const user = await prisma.user.delete({
    where: { id: userId?.toString() }
  })
  return new Response(JSON.stringify(user), { status: 200 })
}
