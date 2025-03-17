'use server'
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import prisma from '@/lib/prisma'
import { PostEntity } from '@/models/PostEntity'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export const createPost = async (post: any) => {
  'use server'
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return
  }
  await prisma.post.create({
    data: {
      ...post,
      userId: session?.user?.id
    }
  })
  redirect('/blog')
}
export const editPost = async (post: Partial<PostEntity>) => {
  'use server'
  await prisma.post.update({
    where: {
      id: post.id
    },
    data: post
  })
  redirect('/blog')
}
export const deletePost = async (id: number) => {
  'use server'
  await prisma.post.delete({
    where: {
      id
    }
  })
  redirect('/blog')
}
