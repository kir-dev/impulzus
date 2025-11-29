import ArchiveClient from '@/components/archive/ArchiveClient'
import prisma from '@/lib/prisma'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { getTranslations } from 'next-intl/server'
import { authOptions } from '../api/auth/[...nextauth]/authOptions'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations()

  return {
    title: `Impulzus | ${t('archive.archive')}`
  }
}

export default async function Archive() {
  const newspapers = await prisma.newspaper.findMany()
  const session = await getServerSession(authOptions)
  const isAdmin = !!session?.user?.isAdmin
  const deleteData = async (id: number) => {
    'use server'
    prisma.newspaper.delete({ where: { id } })
  }
  return <ArchiveClient newspapers={newspapers} isAdmin={isAdmin} deleteData={deleteData} />
}
