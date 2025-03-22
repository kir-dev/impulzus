'use server'
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { revalidatePath } from 'next/cache'

export const createComment = async (content: string, postId: number) => {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return
  }
  await prisma.comment.create({
    data: {
      content,
      postId: postId,
      userId: session?.user?.id
    }
  })
  revalidatePath('/blog/' + postId)
}
