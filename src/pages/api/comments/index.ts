import prisma from '@/lib/prisma'
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
  const comment = await prisma.comment.create({
    data: {
      content: req.body.content,
      userId: req.body.userId,
      postId: req.body.postId
    }
  })
  res.status(200).json(comment)
}
