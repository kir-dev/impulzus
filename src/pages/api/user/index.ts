import prisma from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export type UserData = {
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

const handleGET = async (res: NextApiResponse<UserData[]>) => {
  const users = await prisma.user.findMany()
  res.status(200).json(users)
}

const handlePOST = async (req: NextApiRequest, res: NextApiResponse<UserData>) => {
  /*const user = await prisma.user.create({ data: { id: req.body.id } })
  res.status(200).json(user)*/
}
