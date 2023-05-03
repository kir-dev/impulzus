import prisma from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
import { NewspaperEntity } from './dto/NewspaperEntity.dto'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const newspaperId = Number(req.query.id)

  switch (req.method) {
    case 'GET':
      return handleGET(newspaperId, res)

    case 'PATCH':
      return handlePATCH(newspaperId, req, res)

    case 'DELETE':
      return handleDELETE(newspaperId, res)

    default:
      throw new Error(`The HTTP ${req.method} method is not supported at this route.`)
  }
}

const handleGET = async (newspaperId: number, res: NextApiResponse<NewspaperEntity | string>) => {
  const newspaper = await prisma.newspaper.findUnique({
    where: { id: newspaperId }
  })
  if (newspaper === null) {
    return res.status(404).send('Az újság nem található!')
  }
  return res.status(200).json(newspaper)
}

const handlePATCH = async (newspaperId: number, req: NextApiRequest, res: NextApiResponse<NewspaperEntity | string>) => {
  const newspaper = await prisma.newspaper.update({
    where: { id: newspaperId },
    data: req.body
  })
  return res.status(200).json(newspaper)
}

const handleDELETE = async (newspaperId: number, res: NextApiResponse<NewspaperEntity | string>) => {
  try {
    const newspaper = await prisma.newspaper.delete({
      where: { id: newspaperId }
    })
    return res.status(200).json(newspaper)
  } catch {
    return res.status(404).json('Az újság nem található!')
  }
}
