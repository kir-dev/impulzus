import prisma from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
import { IdeaData } from '.'

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

const handleGET = async (ideaId: unknown, res: NextApiResponse<IdeaData | null>) => {
  const idea = await prisma.idea.findUnique({
    where: { id: Number(ideaId) }
  })
  return res.status(200).json(idea)
}

const handlePATCH = async (ideaId: unknown, req: NextApiRequest, res: NextApiResponse<IdeaData | null>) => {
  const idea = await prisma.idea.update({
    where: { id: Number(ideaId) },
    data: { description: req.body.description }
  })
  return res.status(200).json(idea)
}

const handleDELETE = async (ideaId: unknown, res: NextApiResponse<IdeaData>) => {
  const idea = await prisma.idea.delete({
    where: { id: Number(ideaId) }
  })
  return res.status(200).json(idea)
}
