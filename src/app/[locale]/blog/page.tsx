import { PageHeading } from '@/components/common/PageHeading'
import { Title } from '@/components/common/Title'
import prisma from '@/lib/prisma'
import { PostEntity } from '@/models/PostEntity'
import { UserEntity } from '@/models/UserEntity'
import { PATHS } from '@/util/paths'
import { Button, Flex, GridItem, SimpleGrid, Tag, Text, VStack, Wrap } from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import { useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

export const getServerSideProps: GetServerSideProps = async () => {
  const posts = await prisma.post.findMany({
    include: {
      user: true
    }
  })

  return {
    props: { posts: JSON.parse(JSON.stringify(posts)) }
  }
}

type Props = {
  posts: (PostEntity & { user: UserEntity })[]
}

export default function Blog({ posts }: Props) {
  const { status } = useSession()
  const t = useTranslations()
  const isAuthenticated = status === 'authenticated'

  return (
    <>
      <Title text={t('blog.title')} />
      <PageHeading text={t('blog.title')} />
      {isAuthenticated && (
        <Flex justify="flex-end">
          <Link href={PATHS.BLOG + '/new'}>
            <Button>{t('blog.newPost')}</Button>
          </Link>
        </Flex>
      )}
      <SimpleGrid my={5} columns={{ base: 1, xl: 2 }} spacing={10}>
        {posts.map((p) => (
          <GridItem key={p.id} borderWidth={1} borderRadius={5} p={2}>
            <Link href={PATHS.BLOG + '/' + p.id} key={p.id}>
              <VStack align="flex-start">
                <Text fontSize="2xl" as="b">
                  {p.title}
                </Text>
                <Text as="i">
                  {p.user.name} - {new Date(p.createdAt).toLocaleDateString()}
                </Text>
                <Text>&ldquo;{p.previewContent}&rdquo;</Text>
                <Wrap>
                  {p.categories.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </Wrap>
              </VStack>
            </Link>
          </GridItem>
        ))}
      </SimpleGrid>
    </>
  )
}
