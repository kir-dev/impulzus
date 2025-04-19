'use server'
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import prisma from '@/lib/prisma'
import { CreatePostDto } from '@/models/PostEntity'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export const createPost = async (post: CreatePostDto) => {
  const session = await getServerSession(authOptions)
  const user = session?.user
  if (!user?.id || !user?.isAdmin) {
    return
  }
  await prisma.post.create({
    data: {
      ...post,
      userId: user?.id
    }
  })
  redirect('/blog')
}
export const editPost = async (id: number, post: Partial<CreatePostDto>) => {
  const session = await getServerSession(authOptions)
  const user = session?.user
  if (!user?.id || !user?.isAdmin) {
    return
  }
  await prisma.post.update({
    where: {
      id: id
    },
    data: post
  })
  redirect('/blog')
}
export const deletePost = async (id: number) => {
  const session = await getServerSession(authOptions)
  const user = session?.user
  if (!user?.id || !user?.isAdmin) {
    return
  }
  await prisma.post.delete({
    where: {
      id
    }
  })
  redirect('/blog')
}

export const getLatestBlogPosts = async () => {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: 'desc'
    },
    take: 3
  })
  return posts
}
