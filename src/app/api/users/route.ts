import prisma from '@/lib/prisma'
import { PrismaClientValidationError } from '@prisma/client/runtime/library'
import { NextApiRequest, NextApiResponse } from 'next'
import { UserEntity } from '../../../models/UserEntity'

export const GET = async (res: NextApiResponse<UserEntity[]>) => {
  const users = await prisma.user.findMany()
  return new Response(JSON.stringify(users), { status: 200 })
}

export const POST = async (req: NextApiRequest, res: NextApiResponse<UserEntity | unknown>) => {
  try {
    const user = await prisma.user.create({
      data: req.body
    })
    return new Response(JSON.stringify(user), { status: 200 })
  } catch (e) {
    if (e instanceof PrismaClientValidationError) {
      return new Response(e.message, { status: 400 })
    } else {
      return new Response('Something went wrong!', { status: 500 })
    }
  }
}
