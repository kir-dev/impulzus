import prisma from '@/lib/prisma'
import { PrismaClientValidationError } from '@prisma/client/runtime/library'
import { NextApiRequest, NextApiResponse } from 'next'
import { CommentEntity } from './dto/CommentEntity.dto'

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

const handleGET = async (res: NextApiResponse<CommentEntity[]>) => {
  const comments = await prisma.comment.findMany()
  res.status(200).json(comments)
}

const handlePOST = async (req: NextApiRequest, res: NextApiResponse<CommentEntity>) => {
  try {
    const comment = await prisma.comment.create({
      data: req.body
    })
    res.status(200).json(comment)
  } catch (e) {
    if (e instanceof PrismaClientValidationError) {
      res.status(400).json(e.message)
    } else {
      res.status(500).json(e)
    }
  }
}
