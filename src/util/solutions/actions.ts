'use server'

import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import prisma from '@/lib/prisma'
import { CreateSolutionDTO } from '@/models/SolutionEntity'
import { getServerSession } from 'next-auth'
import { revalidatePath } from 'next/cache'
import { deleteFileFromBucket } from '../newspapers/actions'

const getUrlFromFileName = (fileName: string) => `https://${process.env.S3_ENDPOINT}/${process.env.S3_BUCKET_NAME}/${fileName}`

export const createSolution = async (solution: CreateSolutionDTO) => {
  const session = await getServerSession(authOptions)
  const user = session?.user
  if (!user?.id || !user?.isAdmin) {
    return
  }

  await prisma.solution.create({
    data: {
      title: solution.title,
      ...(solution.content !== undefined && { content: solution.content }),
      ...(solution.image && { image: getUrlFromFileName(solution.image) })
    }
  })
  revalidatePath('/kwc')
}

export const deleteSolution = async (id: number) => {
  const session = await getServerSession(authOptions)
  const user = session?.user
  if (!user?.id || !user?.isAdmin) {
    return
  }

  const solution = await prisma.solution.delete({ where: { id } })
  if (solution.image) {
    deleteFileFromBucket(solution.image)
  }
  revalidatePath('/kwc')
}
