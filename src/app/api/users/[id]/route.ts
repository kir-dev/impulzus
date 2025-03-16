import prisma from '@/lib/prisma'
import { NotFoundException } from 'next-api-decorators'

export const GET = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const userId = Number(id)
  const user = await prisma.user.findUnique({
    where: { id: userId?.toString() }
  })
  if (!user) {
    throw new NotFoundException()
  }
  return new Response(JSON.stringify(user), { status: 200 })
}

export const PATCH = async (req: Request, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const userId = Number(id)
  const body = await req.json()
  const user = await prisma.user.update({
    where: { id: userId?.toString() },
    data: body
  })
  return new Response(JSON.stringify(user), { status: 200 })
}

export const DELETE = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const userId = Number(id)
  const user = await prisma.user.delete({
    where: { id: userId?.toString() }
  })
  return new Response(JSON.stringify(user), { status: 200 })
}
