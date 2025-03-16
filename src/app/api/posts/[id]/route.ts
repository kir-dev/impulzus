import prisma from '@/lib/prisma'
import { PrismaClientValidationError } from '@prisma/client/runtime/library'

export const GET = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const postId = Number(id)
  const post = await prisma.post.findUnique({
    where: { id: Number(postId) }
  })
  if (post === null) {
    return new Response('A poszt nem található!', { status: 404 })
  }
  return new Response(JSON.stringify(post), { status: 200 })
}

export const PATCH = async (req: Request, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const postId = Number(id)
  try {
    const post = await prisma.post.update({
      where: { id: Number(postId) },
      data: await req.json()
    })
    return new Response(JSON.stringify(post), { status: 200 })
  } catch (e) {
    if (e instanceof PrismaClientValidationError) {
      return new Response(e.message, { status: 400 })
    } else {
      return new Response('Something went wrong!', { status: 500 })
    }
  }
}

export const DELETE = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const postId = Number(id)
  try {
    const post = await prisma.post.delete({
      where: { id: Number(postId) }
    })
    return new Response(JSON.stringify(post), { status: 200 })
  } catch (e) {
    if (e instanceof PrismaClientValidationError) {
      return new Response(e.message, { status: 400 })
    } else {
      return new Response('Something went wrong!', { status: 500 })
    }
  }
}
