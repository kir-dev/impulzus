import prisma from '@/lib/prisma'
import { PrismaClientValidationError } from '@prisma/client/runtime/library'
import { NextApiRequest, NextApiResponse } from 'next'
import { UserEntity } from '../../../models/UserEntity'

export const GET = async (res: NextApiResponse<UserEntity[]>) => {
  const users = await prisma.user.findMany()
  res.status(200).json(users)
}

export const POST = async (req: NextApiRequest, res: NextApiResponse<UserEntity | unknown>) => {
  try {
    const user = await prisma.user.create({
      data: req.body
    })
    res.status(200).json(user)
  } catch (e) {
    if (e instanceof PrismaClientValidationError) {
      return res.status(400).send(e.message)
    } else {
      return res.status(500).send(e)
    }
  }
}
