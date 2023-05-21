import { PageHeading } from '@/components/common/PageHeading'
import { Title } from '@/components/common/Title'
import prisma from '@/lib/prisma'
import { PATHS } from '@/util/paths'
import { Button, GridItem, SimpleGrid, Tag, Text, VStack } from '@chakra-ui/react'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import { PostEntity } from '../api/posts/dto/PostEntity.dto'
import { UserEntity } from '../api/users/dto/UserEntity.dto'

export const getStaticProps: GetStaticProps = async () => {
  const posts = await prisma.post.findMany({
    include: {
      user: true
    }
  })

  return {
    props: { posts: JSON.parse(JSON.stringify(posts)) },
    revalidate: 10
  }
}

type Props = {
  posts: (PostEntity & { user: UserEntity })[]
}

export default function Blog({ posts }: Props) {
  return (
    <>
      <Title text="Blog" />
      <PageHeading text="Blog" />
      <Link href={PATHS.BLOG + '/new'}>
        <Button>Új poszt</Button>
      </Link>
      <SimpleGrid my={5} columns={{ base: 1, xl: 2 }} spacing={10}>
        {posts.map((p) => (
          <GridItem key={p.id}>
            <Link href={PATHS.BLOG + '/' + p.id} key={p.id}>
              <VStack align="flex-start">
                <Text as="b">{p.title}</Text>
                <Text as="i">
                  {p.user.fullName} - {new Date(p.createdAt).toLocaleDateString()}
                </Text>
                <Text>"{p.previewContent}"</Text>
                {p.type.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </VStack>
            </Link>
          </GridItem>
        ))}
      </SimpleGrid>
    </>
  )
}
