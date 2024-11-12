import prisma from '@/lib/prisma'
import { PrismaClientValidationError } from '@prisma/client/runtime/library'
import { NextApiRequest, NextApiResponse } from 'next'
import { NewspaperEntity } from '../../../models/NewspaperEntity'

export const GET = async (res: NextApiResponse<NewspaperEntity[]>) => {
  const newspapers = await prisma.newspaper.findMany()
  res.status(200).json(newspapers)
}

export const POST = async (req: NextApiRequest, res: NextApiResponse<NewspaperEntity | unknown>) => {
  try {
    const newspaper = await prisma.newspaper.create({
      data: req.body
    })
    res.status(200).json(newspaper)
  } catch (e) {
    if (e instanceof PrismaClientValidationError) {
      return res.status(400).send(e.message)
    } else {
      return res.status(500).send(e)
    }
  }
}
