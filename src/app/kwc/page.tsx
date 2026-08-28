import KwcClient from '@/components/kwc/KwcClient'
import prisma from '@/lib/prisma'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { getTranslations } from 'next-intl/server'
import { authOptions } from '../api/auth/[...nextauth]/authOptions'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations()

  return {
    title: `Impulzus | ${t('navitems.kwc')}`
  }
}

export default async function Kwc() {
  const solutions = await prisma.solution.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  })
  const session = await getServerSession(authOptions)
  const isAdmin = !!session?.user?.isAdmin
  return (
    <KwcClient
      solutions={solutions.map((solution) => ({
        ...solution,
        content: solution.content ?? undefined,
        image: solution.image ?? undefined
      }))}
      isAdmin={isAdmin}
    />
  )
}
