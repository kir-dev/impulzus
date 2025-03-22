'use server'

import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import prisma from '@/lib/prisma'
import { del } from '@vercel/blob'
import { getServerSession } from 'next-auth'

export const createNewspaper = async (newspaper: any) => {
  const session = await getServerSession(authOptions)
  const user = session?.user
  if (!user?.id || !user?.isAdmin) {
    return
  }
  await prisma.newspaper.create({
    data: newspaper
  })
}
export const editNewspaper = async (id: number, data: any) => {
  const session = await getServerSession(authOptions)
  const user = session?.user
  if (!user?.id || !user?.isAdmin) {
    return
  }
  const oldURL = data.oldURL

  if (oldURL) {
    try {
      await del(oldURL)
    } catch (e) {
      console.log(e)
    }
  }

  await prisma.newspaper.update({
    where: { id },
    data: data
  })
}
export const deleteNewspaper = async (id: number) => {
  const session = await getServerSession(authOptions)
  const user = session?.user
  if (!user?.id || !user?.isAdmin) {
    return
  }
  await prisma.newspaper.delete({
    where: {
      id
    }
  })
}
