'use server'

import prisma from '@/lib/prisma'
import { del } from '@vercel/blob'

export const createNewspaper = async (newspaper: any) => {
  'use server'
  await prisma.newspaper.create({
    data: newspaper
  })
}
export const editNewspaper = async (id: number, data: any) => {
  'use server'
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
  'use server'
  await prisma.newspaper.delete({
    where: {
      id
    }
  })
}
