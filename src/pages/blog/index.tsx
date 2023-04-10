import { PageHeading } from '@/components/common/PageHeading'
import { Title } from '@/components/common/Title'
import prisma from '@/lib/prisma'
import { PATHS } from '@/util/paths'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import { PostEntity } from '../api/posts/dto/PostEntity.dto'

export const getStaticProps: GetStaticProps = async () => {
  const posts = await prisma.post.findMany()

  return {
    props: { posts: JSON.parse(JSON.stringify(posts)) },
    revalidate: 10
  }
}

type Props = {
  posts: PostEntity[]
}

export default function Blog({ posts }: Props) {
  console.log(posts)
  return (
    <>
      <Title text="Blog" />
      <PageHeading text="Blog" />
      {posts.map((p) => (
        <Link href={PATHS.BLOG + '/' + p.id} key={p.id}>
          {p.id + ' ' + p.title}
        </Link>
      ))}
    </>
  )
}
