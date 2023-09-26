import prisma from '@/lib/prisma'
import { PrismaClientValidationError } from '@prisma/client/runtime/library'
import { NextApiRequest, NextApiResponse } from 'next'
import { PostEntity } from './dto/PostEntity.dto'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return handleGET(res)

    case 'POST':
      return handlePOST(req, res)

    default:
      throw new Error(`The HTTP ${req.method} method is not supported at this route.`)
  }
}

const handleGET = async (res: NextApiResponse<PostEntity[]>) => {
  const posts = await prisma.post.findMany()
  res.status(200).json(posts)
}

const handlePOST = async (req: NextApiRequest, res: NextApiResponse<PostEntity | unknown>) => {
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
