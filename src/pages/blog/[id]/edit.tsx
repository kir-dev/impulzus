import { EditPost } from '@/components/blog/EditPost'
import prisma from '@/lib/prisma'
import { PostEntity } from '@/pages/api/posts/dto/PostEntity.dto'
import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const post = await prisma.post.findUnique({
    where: {
      id: Number(params?.id)
    }
  })

  return {
    props: { post: JSON.parse(JSON.stringify(post)) }
  }
}

type Props = {
  post: PostEntity
}

export default function Blog({ post }: Props) {
  return (
    <>
      <EditPost post={post} />
    </>
  )
}
