import prisma from '@/lib/prisma'
import { CommentEntity } from '@/models/CommentEntity'
import { NextApiRequest, NextApiResponse } from 'next'

export const GET = async (commentId: unknown, res: NextApiResponse<CommentEntity | null>) => {
  const comment = await prisma.comment.findUnique({
    where: { id: Number(commentId) }
  })
  return new Response(JSON.stringify(comment), { status: 200 })
}

export const PATCH = async (commentId: unknown, req: NextApiRequest, res: NextApiResponse<CommentEntity | string>) => {
  const comment = await prisma.comment.update({
    where: { id: Number(commentId) },
    data: req.body
  })
  return new Response(JSON.stringify(comment), { status: 200 })
}

export const DELETE = async (commentId: unknown, res: NextApiResponse<CommentEntity>) => {
  const comment = await prisma.comment.delete({
    where: { id: Number(commentId) }
  })
  return new Response(JSON.stringify(comment), { status: 200 })
}
