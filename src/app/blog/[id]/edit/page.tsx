import { EditPost } from '@/components/blog/EditPost'
import prisma from '@/lib/prisma'
import { redirect } from 'next/navigation'

export default async function Blog({ params }: { params: { id: string } }) {
  const post = await prisma.post.findUnique({
    where: {
      id: Number(params?.id)
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
