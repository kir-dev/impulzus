import prisma from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export type IdeaData = {
  id: number
  description: string
}

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

const handleGET = async (res: NextApiResponse<IdeaData[]>) => {
  const ideas = await prisma.idea.findMany()
  res.status(200).json(ideas)
}

const handlePOST = async (req: NextApiRequest, res: NextApiResponse<IdeaData>) => {
  const idea = await prisma.idea.create({ data: { id: req.body.id, description: req.body.description } })
  res.status(200).json(idea)
}
