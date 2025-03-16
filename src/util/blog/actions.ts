'use server'
import prisma from '@/lib/prisma'
import { Post } from '@prisma/client'

export const savePost = async (post: Post) => {
  return prisma.post.create({
    data: post
  })
}
export const deletePost = async (id: string) => {
  return prisma.post.delete({
    where: {
      id: Number(id)
    }
  })
}
