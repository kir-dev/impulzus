import prisma from '@/lib/prisma'
import { IdeaEntity } from '@/models/IdeaEntity'
import { NextApiRequest, NextApiResponse } from 'next'

export const GET = async (ideaId: unknown, res: NextApiResponse<IdeaEntity | string>) => {
  const idea = await prisma.idea.findUnique({
    where: { id: Number(ideaId) }
  })
  if (idea === null) {
    return res.status(404).send('Az ötlet nem található!')
  }
  return res.status(200).json(idea)
}

export const PATCH = async (ideaId: unknown, req: NextApiRequest, res: NextApiResponse<IdeaEntity | string>) => {
  try {
    const idea = await prisma.idea.update({
      where: { id: Number(ideaId) },
      data: { description: req.body.description }
    })
    return res.status(200).json(idea)
  } catch (e) {
    return res.status(404).send('Az ötlet nem található!')
  }
}

export const DELETE = async (ideaId: unknown, res: NextApiResponse<IdeaEntity | string>) => {
  try {
    const idea = await prisma.idea.delete({
      where: { id: Number(ideaId) }
    })
    return res.status(200).json(idea)
  } catch (e) {
    return res.status(404).send('Az ötlet nem található!')
  }
}
