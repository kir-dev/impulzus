'use server'

import prisma from '@/lib/prisma'

export async function createUser(user: any) {
  'use server'
  await prisma.user.create({
    data: user
  })
}
export async function updateUser(id: string, user: any) {
  'use server'
  await prisma.user.update({
    where: {
      id: user.id
    },
    data: user
  })
}
export async function deleteUser(id: string) {
  'use server'
  await prisma.user.delete({
    where: {
      id
    }
  })
}
