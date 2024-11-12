import prisma from '@/lib/prisma'
import { PostEntity } from '@/models/PostEntity'
import { PrismaClientValidationError } from '@prisma/client/runtime/library'
import { NextApiRequest, NextApiResponse } from 'next'

export const GET = async (postId: unknown, res: NextApiResponse<PostEntity | string>) => {
  const post = await prisma.post.findUnique({
    where: { id: Number(postId) }
  })
  if (post === null) {
    return res.status(404).json('A poszt nem található!')
  }
  return res.status(200).json(post)
}

export const PATCH = async (postId: unknown, req: NextApiRequest, res: NextApiResponse<PostEntity | string>) => {
  try {
    const post = await prisma.post.update({
      where: { id: Number(postId) },
      data: req.body
    })
    return res.status(200).json(post)
  } catch (e) {
    if (e instanceof PrismaClientValidationError) {
      res.status(400).json(e.message)
    } else {
      res.status(500).json(e as string)
    }
  }
}

export const DELETE = async (postId: unknown, res: NextApiResponse<PostEntity | unknown>) => {
  try {
    const post = await prisma.post.delete({
      where: { id: Number(postId) }
    })
    return res.status(200).json(post)
  } catch (e) {
    if (e instanceof PrismaClientValidationError) {
      res.status(400).json(e.message)
    } else {
      res.status(500).json(e)
    }
  }
}
