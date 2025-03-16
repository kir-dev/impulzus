import prisma from '@/lib/prisma'
import { PrismaClientValidationError } from '@prisma/client/runtime'
import { del } from '@vercel/blob'

export const GET = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const newspaperId = Number(id)
  const newspaper = await prisma.newspaper.findUnique({
    where: { id: newspaperId }
  })
  if (newspaper === null) {
    return new Response('Az újság nem található!', { status: 404 })
  }
  return new Response(JSON.stringify(newspaper), { status: 200 })
}

export const PATCH = async (req: Request, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const newspaperId = Number(id)
  const data = await req.json()
  const oldURL = data.oldURL

  if (oldURL) {
    try {
      await del(oldURL)
    } catch (e) {
      console.log(e)
    }
  }

  try {
    const newspaper = await prisma.newspaper.update({
      where: { id: newspaperId },
      data: data
    })
    return new Response(JSON.stringify(newspaper), { status: 200 })
  } catch (e) {
    return new Response('Az újság nem található!', { status: 404 })
  }
}

export const DELETE = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const newspaperId = Number(id)
  const newspaper = await prisma.newspaper.findUnique({
    where: { id: newspaperId }
  })
  const pdfUrl = newspaper?.pdf
  try {
    if (pdfUrl) {
      await del(pdfUrl)
    }
    const deletedNewspaper = await prisma.newspaper.delete({
      where: { id: newspaperId }
    })
    return new Response(JSON.stringify(deletedNewspaper), { status: 200 })
  } catch (e) {
    if (e instanceof PrismaClientValidationError) {
      return new Response('Az újság nem található!', { status: 400 })
    } else {
      return new Response('Something went wrong!', { status: 500 })
    }
  }
}
