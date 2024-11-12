import prisma from '@/lib/prisma'
import { IdeaEntity } from '@/models/IdeaEntity'
import { PrismaClientValidationError } from '@prisma/client/runtime/library'
import { NextApiResponse } from 'next'

export const GET = async (res: NextApiResponse<IdeaEntity[]>) => {
  const ideas = await prisma.idea.findMany()
  res.status(200).json(ideas)
}

export const POST = async (req: Request, res: NextApiResponse<IdeaEntity | string>) => {
  try {
    const requestData: IdeaEntity = await req.json()
    const idea = await prisma.idea.create({
      data: {
        description: requestData.description
      }
    })
    return new Response(JSON.stringify(idea), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  } catch (e) {
    if (e instanceof PrismaClientValidationError) {
      return new Response(e.message, {
        status: 400
      })
    } else {
      console.log(e)
      return new Response('Internal server error', {
        status: 500
      })
    }
  }
}
