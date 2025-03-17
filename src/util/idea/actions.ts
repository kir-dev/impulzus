'use server'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export const createIdea = async (description: string) => {
  'use server'
  await prisma.idea.create({
    data: {
      description
    }
  })
  revalidatePath('/idea')
}
