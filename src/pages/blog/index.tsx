import prisma from '@/lib/prisma'
import { Divider, Heading } from '@chakra-ui/react'
import { GetStaticProps } from 'next'
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
      <Heading>Blog</Heading>
      <Divider my={3} borderWidth={2} borderColor="black" />
      {posts.map((p) => (
        <p key={p.id}>{p.id + ' ' + p.title}</p>
      ))}
    </>
  )
}
