import prisma from '@/lib/prisma'
import { PrismaClientValidationError } from '@prisma/client/runtime/library'
import { NextApiRequest, NextApiResponse } from 'next'
import { PostEntity } from '../../../models/PostEntity'

export const GET = async (res: NextApiResponse<PostEntity[]>) => {
  const posts = await prisma.post.findMany()
  res.status(200).json(posts)
}

export const POST = async (req: NextApiRequest, res: NextApiResponse<PostEntity | unknown>) => {
  try {
    const post = await prisma.post.create({
      data: req.body
    })
    res.status(200).json(post)
  } catch (e) {
    if (e instanceof PrismaClientValidationError) {
      return res.status(400).send(e.message)
    } else {
      return res.status(500).send(e)
    }
  }
}
