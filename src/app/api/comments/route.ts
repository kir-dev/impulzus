import prisma from '@/lib/prisma'
import { PrismaClientValidationError } from '@prisma/client/runtime/library'
import { NextApiRequest } from 'next'

export const GET = async () => {
  const comments = await prisma.comment.findMany()
  return new Response(JSON.stringify(comments), { status: 200 })
}

export const POST = async (req: NextApiRequest) => {
  try {
    const comment = await prisma.comment.create({
      data: req.body
    })
    return new Response(JSON.stringify(comment), { status: 200 })
  } catch (e) {
    if (e instanceof PrismaClientValidationError) {
      return new Response(e.message, { status: 400 })
    } else {
      return new Response('Something went wrong!', { status: 500 })
    }
  }
}
