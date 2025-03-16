import prisma from '@/lib/prisma'
import { IdeaEntity } from '@/models/IdeaEntity'
import { NextApiRequest, NextApiResponse } from 'next'

export const GET = async (ideaId: unknown, res: NextApiResponse<IdeaEntity | string>) => {
  const idea = await prisma.idea.findUnique({
    where: { id: Number(ideaId) }
  })
  if (idea === null) {
    return new Response('Az ötlet nem található!', { status: 404 })
  }
  return new Response(JSON.stringify(idea), { status: 200 })
}

export const PATCH = async (ideaId: unknown, req: NextApiRequest, res: NextApiResponse<IdeaEntity | string>) => {
  try {
    const idea = await prisma.idea.update({
      where: { id: Number(ideaId) },
      data: { description: req.body.description }
    })
    return new Response(JSON.stringify(idea), { status: 200 })
  } catch (e) {
    return new Response('Az ötlet nem található!', { status: 404 })
  }
}

export const DELETE = async (ideaId: unknown, res: NextApiResponse<IdeaEntity | string>) => {
  try {
    const idea = await prisma.idea.delete({
      where: { id: Number(ideaId) }
    })
    return new Response(JSON.stringify(idea), { status: 200 })
  } catch (e) {
    return new Response('Az ötlet nem található!', { status: 404 })
  }
}
