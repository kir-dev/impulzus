import BlogList from '@/components/blog/BlogList'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/authOptions'

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
