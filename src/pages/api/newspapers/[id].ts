import prisma from '@/lib/prisma'
import { PrismaClientValidationError } from '@prisma/client/runtime'
import { del } from '@vercel/blob'
import { NextApiRequest, NextApiResponse } from 'next'
import { NewspaperEntity } from '../../../models/NewspaperEntity'

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
  const data = req.body.data
  const oldURL = req.body.oldURL

  if (oldURL) {
    try {
      await del(oldURL)
    } catch (e) {
      console.log(e)
    }
  }

  try {
    const newspaper = await prisma.newspaper.update({
      where: { id: newspaperId },
      data: data
    })
    return res.status(200).json(newspaper)
  } catch (e) {
    return res.status(404).send('Az újság nem található!')
  }
}

const handleDELETE = async (newspaperId: number, res: NextApiResponse<NewspaperEntity | unknown>) => {
  const newspaper = await prisma.newspaper.findUnique({
    where: { id: newspaperId }
  })
  const pdfUrl = newspaper?.pdf
  try {
    if (pdfUrl) {
      await del(pdfUrl)
    }
    const deletedNewspaper = await prisma.newspaper.delete({
      where: { id: newspaperId }
    })
    return res.status(200).json(deletedNewspaper)
  } catch (e) {
    if (e instanceof PrismaClientValidationError) {
      return res.status(404).json('Az újság nem található!')
    } else {
      return res.status(500).json(e)
    }
  }
}
