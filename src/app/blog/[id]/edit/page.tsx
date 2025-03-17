import { EditPost } from '@/components/blog/EditPost'
import prisma from '@/lib/prisma'
import { redirect } from 'next/navigation'

export default async function Blog({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const post = await prisma.post.findUnique({
    where: {
      id: Number(id)
    }
  })
  if (!post) {
    redirect('/blog')
  }

  return (
    <>
      <EditPost post={post} />
    </>
  )
}
