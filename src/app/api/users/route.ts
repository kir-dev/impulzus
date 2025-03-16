import prisma from '@/lib/prisma'
import { PrismaClientValidationError } from '@prisma/client/runtime/library'

export const GET = async () => {
  const users = await prisma.user.findMany()
  return new Response(JSON.stringify(users), { status: 200 })
}

export const POST = async (req: Request) => {
  const body = await req.json()
  try {
    const user = await prisma.user.create({
      data: body
    })
    return new Response(JSON.stringify(user), { status: 200 })
  } catch (e) {
    if (e instanceof PrismaClientValidationError) {
      return new Response(e.message, { status: 400 })
    } else {
      return new Response('Something went wrong!', { status: 500 })
    }
  }
}
