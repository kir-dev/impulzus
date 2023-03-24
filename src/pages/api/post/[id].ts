import prisma from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
import { PostData } from '.'

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

const handleGET = async (postId: unknown, res: NextApiResponse<PostData | null>) => {
  const post = await prisma.post.findUnique({
    where: { id: Number(postId) }
  })
  return res.status(200).json(post)
}

// DELETE /api/idea/:id
const handleDELETE = async (postId: unknown, res: NextApiResponse<PostData>) => {
  const post = await prisma.post.delete({
    where: { id: Number(postId) }
  })
  return res.status(200).json(post)
}
