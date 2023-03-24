import prisma from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export type NewspaperData = {
  id: number
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

const handleGET = async (res: NextApiResponse<NewspaperData[]>) => {
  const newspapers = await prisma.newspaper.findMany()
  res.status(200).json(newspapers)
}

const handlePOST = async (req: NextApiRequest, res: NextApiResponse<NewspaperData>) => {
  /*const newspaper = await prisma.newspaper.create({ data: { id: req.body.id } })
  res.status(200).json(newspaper)*/
}
