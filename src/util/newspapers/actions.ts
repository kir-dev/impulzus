'use server'

import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import prisma from '@/lib/prisma'
import { CreateNewsPaperDTO } from '@/models/NewspaperEntity'
import { getServerSession } from 'next-auth'
import { s3Client } from '../files/s3-file-management'

export const createNewspaper = async (newspaper: CreateNewsPaperDTO, fileName: string) => {
  const session = await getServerSession(authOptions)
  const user = session?.user
  if (!user?.id || !user?.isAdmin) {
    return
  }
  await prisma.newspaper.create({
    data: {
      ...newspaper,
      pdf: await getUrlFromFileName(fileName)
    }
  })
}
export const editNewspaper = async (id: number, data: Partial<CreateNewsPaperDTO>, filename?: string) => {
  const session = await getServerSession(authOptions)
  const user = session?.user
  if (!user?.id || !user?.isAdmin) {
    return
  }
  if (filename) {
    const oldPaper = await prisma.newspaper.findUnique({
      where: { id }
    })
    if (oldPaper) {
      deleteFileFromBucket(oldPaper.pdf)
    }
  }
  await prisma.newspaper.update({
    where: { id },
    data: {
      ...data,
      pdf: filename ? await getUrlFromFileName(filename) : undefined
    }
  })
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
