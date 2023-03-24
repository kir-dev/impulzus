import prisma from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
import { CommentData } from '.'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const commentId = req.query.id

  switch (req.method) {
    case 'GET':
      return handleGET(commentId, res)

    case 'DELETE':
      return handleDELETE(commentId, res)

    default:
      throw new Error(`The HTTP ${req.method} method is not supported at this route.`)
  }
}

const handleGET = async (commentId: unknown, res: NextApiResponse<CommentData | null>) => {
  const comment = await prisma.comment.findUnique({
    where: { id: Number(commentId) }
  })
  return res.status(200).json(comment)
}

const handleDELETE = async (commentId: unknown, res: NextApiResponse<CommentData>) => {
  const comment = await prisma.comment.delete({
    where: { id: Number(commentId) }
  })
  return res.status(200).json(comment)
}
