'use server'

import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import prisma from '@/lib/prisma'
import { Locale, TextType } from '@/models/GenericTypes'
import { getServerSession } from 'next-auth'
import { unstable_cacheTag as cacheTag, revalidateTag } from 'next/cache'

export async function editText(details: string, language: Locale, textType: TextType) {
  const session = await getServerSession(authOptions)
  const user = session?.user
  if (!user?.id || !user?.isAdmin) {
    return
  }
  await prisma.texts.upsert({
    where: {
      id: textType
    },
    update: {
      contentHu: language === 'hu' ? details : undefined,
      contentEn: language === 'en' ? details : undefined
    },
    create: {
      id: textType,
      contentHu: language === 'hu' ? details : '',
      contentEn: language === 'en' ? details : ''
    }
  })
  revalidateTag(`text-${textType}`)
}

export async function getText(textType: TextType) {
  'use cache'
  cacheTag(`text-${textType}`)
  const texts = await prisma.texts.findUnique({
    where: {
      id: textType
    }
  })
  return texts
}
