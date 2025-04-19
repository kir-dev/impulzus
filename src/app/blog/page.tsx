import { PageHeading } from '@/components/common/PageHeading'
import { Title } from '@/components/common/Title'
import prisma from '@/lib/prisma'
import { PATHS } from '@/util/paths'
import { Button, Flex, GridItem, SimpleGrid, Tag, Text, VStack, Wrap } from '@chakra-ui/react'
import { getServerSession } from 'next-auth'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { authOptions } from '../api/auth/[...nextauth]/authOptions'

export default async function Blog() {
  const session = await getServerSession(authOptions)
  const t = await getTranslations()
  const posts = await prisma.post.findMany({
    include: {
      user: true
    }
  })
  const isAuthenticated = !!session

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
                <Text>{p.previewContent}</Text>
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
