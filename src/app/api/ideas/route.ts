import prisma from '@/lib/prisma'
import { IdeaEntity } from '@/models/IdeaEntity'
import { PrismaClientValidationError } from '@prisma/client/runtime/library'

export const GET = async () => {
  const ideas = await prisma.idea.findMany()
  return new Response(JSON.stringify(ideas), {
    status: 200
  })
}

export const POST = async (req: Request) => {
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
