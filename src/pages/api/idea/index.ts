import prisma from '@/lib/prisma'
import { PrismaClientValidationError } from '@prisma/client/runtime/library'
import { NextApiRequest, NextApiResponse } from 'next'
import { IdeaEntity } from './dto/IdeaEntity.dto'

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

const handleGET = async (res: NextApiResponse<IdeaEntity[]>) => {
  const ideas = await prisma.idea.findMany()
  res.status(200).json(ideas)
}

const handlePOST = async (req: NextApiRequest, res: NextApiResponse<IdeaEntity | unknown>) => {
  try {
    const idea = await prisma.idea.create({ data: { description: req.body.description } })
    res.status(200).json(idea)
  } catch (e) {
    if (e instanceof PrismaClientValidationError) {
      res.status(400).send(e.message)
    } else {
      res.status(500).send(e)
    }
  }
}
