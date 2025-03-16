import prisma from '@/lib/prisma'
import { PrismaClientValidationError } from '@prisma/client/runtime/library'

export const GET = async () => {
  const posts = await prisma.post.findMany()
  return new Response(JSON.stringify(posts), { status: 200 })
}

export const POST = async (req: Request) => {
  try {
    const data = await req.json()
    const post = await prisma.post.create({
      data: data
    })
    return new Response(JSON.stringify(post), { status: 200 })
  } catch (e) {
    if (e instanceof PrismaClientValidationError) {
      return new Response(e.message, { status: 400 })
    } else {
      console.log(e)
      return new Response('Something went wrong!', { status: 500 })
    }
  }
}
