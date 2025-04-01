'use server'

import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import prisma from '@/lib/prisma'
import { CreateUserDto } from '@/models/UserEntity'
import { getServerSession } from 'next-auth'
import { revalidatePath } from 'next/cache'

export async function createUser(createdUser: CreateUserDto) {
  const session = await getServerSession(authOptions)
  const user = session?.user
  if (!user?.id || !user?.isAdmin) {
    return
  }
  await prisma.user.create({
    data: createdUser
  })
  revalidatePath('/editorShip')
}
export async function updateUser(id: string, updatedUser: Partial<CreateUserDto>) {
  const session = await getServerSession(authOptions)
  const user = session?.user
  if (!user?.id || !user?.isAdmin) {
    return
  }
  await prisma.user.update({
    where: {
      id: id
    },
    data: updatedUser
  })
  revalidatePath('/editorShip')
}
export async function deleteUser(id: string) {
  const session = await getServerSession(authOptions)
  const user = session?.user
  if (!user?.id || !user?.isAdmin) {
    return
  }
  await prisma.user.update({
    where: {
      id
    },
    data: {
      isMember: false
    }
  })
  revalidatePath('/editorShip')
}
