import prisma from '@/lib/prisma'
import { IdeaEntity } from '@/models/IdeaEntity'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const ideaId = req.query.id

  switch (req.method) {
    case 'GET':
      return handleGET(ideaId, res)

    case 'PATCH':
      return handlePATCH(ideaId, req, res)

    case 'DELETE':
      return handleDELETE(ideaId, res)

    default:
      throw new Error(`The HTTP ${req.method} method is not supported at this route.`)
  }
}

const handleGET = async (ideaId: unknown, res: NextApiResponse<IdeaEntity | string>) => {
  const idea = await prisma.idea.findUnique({
    where: { id: Number(ideaId) }
  })
  if (idea === null) {
    return res.status(404).send('Az ötlet nem található!')
  }
  return res.status(200).json(idea)
}

const handlePATCH = async (ideaId: unknown, req: NextApiRequest, res: NextApiResponse<IdeaEntity | string>) => {
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

const handleDELETE = async (ideaId: unknown, res: NextApiResponse<IdeaEntity | string>) => {
  try {
    const idea = await prisma.idea.delete({
      where: { id: Number(ideaId) }
    })
    return res.status(200).json(idea)
  } catch (e) {
    return res.status(404).send('Az ötlet nem található!')
  }
}
