import BlogList from '@/components/blog/BlogList'
import prisma from '@/lib/prisma'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { getTranslations } from 'next-intl/server'
import { authOptions } from '../api/auth/[...nextauth]/authOptions'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations()

  return {
    title: `Impulzus | ${t('navitems.blog')}`
  }
}

export default async function Blog() {
  const session = await getServerSession(authOptions)
  const posts = await prisma.post.findMany({
    include: {
      user: true
    }
  })
  const isAuthenticated = !!session

  return <BlogList posts={posts} isAuthenticated={isAuthenticated} />
}
