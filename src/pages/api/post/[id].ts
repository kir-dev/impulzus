import prisma from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
import { PostEntity } from './dto/PostEntity.dto'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const postId = req.query.id

  switch (req.method) {
    case 'GET':
      return handleGET(postId, res)

    case 'DELETE':
      return handleDELETE(postId, res)

    default:
      throw new Error(`The HTTP ${req.method} method is not supported at this route.`)
  }
}

const handleGET = async (postId: unknown, res: NextApiResponse<PostEntity | string>) => {
  const post = await prisma.post.findUnique({
    where: { id: Number(postId) }
  })
  if (post === null) {
    return res.status(404).json('A poszt nem található!')
  }
  return res.status(200).json(post)
}

const handleDELETE = async (postId: unknown, res: NextApiResponse<PostEntity>) => {
  const post = await prisma.post.delete({
    where: { id: Number(postId) }
  })
  return res.status(200).json(post)
}
