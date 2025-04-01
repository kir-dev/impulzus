'use server'
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { revalidatePath } from 'next/cache'

export const createIdea = async (description: string) => {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return
  }
  await prisma.idea.create({
    data: {
      description
    }
  })
  revalidatePath('/idea')
}
export const deleteIdea = async (id: number) => {
  const session = await getServerSession(authOptions)
  const user = session?.user
  if (!user?.id || !user?.isAdmin) {
    return
  }
  await prisma.idea.delete({
    where: {
      id
    }
  })
  revalidatePath('/idea')
}
