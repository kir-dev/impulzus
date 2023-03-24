import prisma from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
import { NewspaperData } from '.'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const newspaperId = req.query.id

  switch (req.method) {
    case 'GET':
      return handleGET(newspaperId, res)

    case 'DELETE':
      return handleDELETE(newspaperId, res)

    default:
      throw new Error(`The HTTP ${req.method} method is not supported at this route.`)
  }
}

const handleGET = async (newspaperId: unknown, res: NextApiResponse<NewspaperData | null>) => {
  const newspaper = await prisma.newspaper.findUnique({
    where: { id: Number(newspaperId) }
  })
  return res.status(200).json(newspaper)
}

// DELETE /api/idea/:id
const handleDELETE = async (newspaperId: unknown, res: NextApiResponse<NewspaperData>) => {
  const newspaper = await prisma.newspaper.delete({
    where: { id: Number(newspaperId) }
  })
  return res.status(200).json(newspaper)
}
