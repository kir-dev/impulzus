import prisma from '@/lib/prisma'
import { NewspaperEntity } from '@/models/NewspaperEntity'
import { PrismaClientValidationError } from '@prisma/client/runtime'
import { del } from '@vercel/blob'
import { NextApiRequest, NextApiResponse } from 'next'

export const GET = async (newspaperId: number, res: NextApiResponse<NewspaperEntity | string>) => {
  const newspaper = await prisma.newspaper.findUnique({
    where: { id: newspaperId }
  })
  if (newspaper === null) {
    return res.status(404).send('Az újság nem található!')
  }
  return res.status(200).json(newspaper)
}

export const PATCH = async (newspaperId: number, req: NextApiRequest, res: NextApiResponse<NewspaperEntity | string>) => {
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

export const DELETE = async (newspaperId: number, res: NextApiResponse<NewspaperEntity | unknown>) => {
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
