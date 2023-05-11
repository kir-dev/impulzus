import { PageHeading } from '@/components/common/PageHeading'
import { Title } from '@/components/common/Title'
import Markdown from '@/components/common/editor/Markdown'
import prisma from '@/lib/prisma'
import { GetServerSideProps } from 'next'
import { PostEntity } from '../api/posts/dto/PostEntity.dto'

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
  console.log(post)
  return (
    <>
      <Title text={post.title} />
      <PageHeading text={post.title} />
      <Markdown markdown={post.content} />
    </>
  )
}
