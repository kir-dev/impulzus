import prisma from '@/lib/prisma'
import { PrismaClientValidationError } from '@prisma/client/runtime/library'

export const GET = async () => {
  const newspapers = await prisma.newspaper.findMany()
  return new Response(JSON.stringify(newspapers), { status: 200 })
}

export const POST = async (req: Request) => {
  try {
    const newspaper = await prisma.newspaper.create({
      data: await req.json()
    })
    return new Response(JSON.stringify(newspaper), { status: 200 })
  } catch (e) {
    if (e instanceof PrismaClientValidationError) {
      return new Response(e.message, { status: 400 })
    } else {
      return new Response('Something went wrong!', { status: 500 })
    }
  }
}
