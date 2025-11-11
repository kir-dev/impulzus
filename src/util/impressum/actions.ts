'use server'

import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { revalidatePath } from 'next/cache'

export const editImpressum = async (details: string) => {
  const session = await getServerSession(authOptions)
  const user = session?.user
  if (!user?.id || !user?.isAdmin) {
    return
  }
  await prisma.impressum.update({
    where: {
      id: 0
    },
    data: {
      details
    }
  })
  revalidatePath('/editorship/')
}

export const editDescription = async (details: string) => {
  const session = await getServerSession(authOptions)
  const user = session?.user
  if (!user?.id || !user?.isAdmin) {
    return
  }
  await prisma.impressum.update({
    where: {
      id: 1
    },
    data: {
      details
    }
  })
  revalidatePath('/')
}
