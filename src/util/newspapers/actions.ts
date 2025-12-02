'use server'

import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import prisma from '@/lib/prisma'
import { CreateNewsPaperDTO, NewspaperEntity } from '@/models/NewspaperEntity'
import { getServerSession } from 'next-auth'
import { revalidatePath } from 'next/cache'
import { s3Client } from '../files/s3-file-management'

export const createNewspaper = async (newspaper: CreateNewsPaperDTO) => {
  const session = await getServerSession(authOptions)
  const user = session?.user
  if (!user?.id || !user?.isAdmin) {
    return
  }
  if (newspaper.isLatest) {
    await removeIsLatestFromAllNewspapers()
  }
  await prisma.newspaper.create({
    data: {
      ...newspaper,
      pdf: await getUrlFromFileName(newspaper.pdf),
      coverImage: await getUrlFromFileName(newspaper.coverImage),
      isLatest: newspaper.isLatest
    }
  })
  revalidatePath('/archive/')
}
export const deleteNewspaper = async (id: number) => {
  const session = await getServerSession(authOptions)
  const user = session?.user
  if (!user?.id || !user?.isAdmin) {
    return
  }
  const newsPaper = await prisma.newspaper.delete({
    where: {
      id
    }
  })
  if (newsPaper.pdf) {
    deleteFileFromBucket(newsPaper.pdf)
  }
  revalidatePath('/archive/')
}

export const getUrlFromFileName = async (fileName: string) => {
  return `https://${process.env.S3_ENDPOINT}/${process.env.S3_BUCKET_NAME}/${fileName}`
}
export const getFileNameFromUrl = async (url: string) => {
  const urlParts = url.split('/')
  return urlParts[urlParts.length - 1]
}
export async function deleteFileFromBucket(url: string) {
  const bucketName = process.env.S3_BUCKET_NAME
  if (!bucketName) {
    return false
  }
  try {
    await s3Client.removeObject(bucketName, await getFileNameFromUrl(url))
  } catch (error) {
    console.error(error)
    return false
  }
  return true
}
export async function getLatestNewspaper(): Promise<NewspaperEntity | null> {
  const newspaper = await prisma.newspaper.findFirst({
    where: {
      isLatest: true
    }
  })
  if (!newspaper) {
    return await prisma.newspaper.findFirst({
      orderBy: {
        grade: 'desc'
      }
    })
  }
  return newspaper
}
export async function removeIsLatestFromAllNewspapers() {
  await prisma.newspaper.updateMany({
    where: {
      isLatest: true
    },
    data: {
      isLatest: false
    }
  })
}
