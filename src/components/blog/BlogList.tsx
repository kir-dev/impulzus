'use client'

import { POST_CATEGORIES } from '@/components/blog/postCategories'
import { PageHeading } from '@/components/common/PageHeading'
import { Title } from '@/components/common/Title'
import { PATHS } from '@/util/paths'
import { AspectRatio, Button, Flex, GridItem, HStack, Image, SimpleGrid, Tag, Text, VStack, Wrap } from '@chakra-ui/react'
import { Prisma } from '@prisma/client'
import { Select } from 'chakra-react-select'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useMemo, useState } from 'react'

type BlogListProps = {
  posts: Prisma.PostGetPayload<{ include: { user: true } }>[]
  isAuthenticated: boolean
}

export default function BlogList({ posts, isAuthenticated }: BlogListProps) {
  const [category, setCategory] = useState('all')
  const filteredPosts = useMemo(() => {
    if (category === 'all') return posts
    return posts.filter((p) => p.categories.includes(category))
  }, [category, posts])
  const t = useTranslations()
  return (
    <>
      <Title text={t('blog.title')} />
      <PageHeading text={t('blog.title')} />
      <Flex justify="space-between">
        <Select
          placeholder={t('blog.category')}
          w="200px"
          options={[
            {
              label: t('blog.categories.all'),
              value: 'all'
            }
          ].concat(POST_CATEGORIES.map((c) => ({ label: t(`blog.categories.${c}`), value: c })))}
          // @ts-expect-error: Type mismatch due to incomplete type definitions
          onChange={(value) => setCategory(value.value)}
          instanceId="blog-category-select"
        />
        {isAuthenticated && (
          <Link href={PATHS.BLOG + '/new'}>
            <Button>{t('blog.newPost')}</Button>
          </Link>
        )}
      </Flex>
      <SimpleGrid my={5} columns={{ base: 1, xl: 2 }} spacing={10}>
        {filteredPosts.map((p) => (
          <GridItem key={p.id} borderWidth={1} borderRadius={5} p={2}>
            <Link href={PATHS.BLOG + '/' + p.id} key={p.id}>
              <HStack>
                <AspectRatio minW="200px" ratio={1} marginRight={4}>
                  <Image src={p.thumbnail} alt={p.title} objectFit="cover" />
                </AspectRatio>
                <VStack align="flex-start">
                  <Text fontSize="2xl" as="b">
                    {p.title}
                  </Text>
                  <Text as="i">
                    {p.user.name} - {new Date(p.createdAt).toLocaleDateString()}
                  </Text>
                  <Text>{p.previewContent}</Text>
                  <Wrap>
                    {p.categories.map((tag) => (
                      <Tag key={tag}>{t(`blog.categories.${tag}`)}</Tag>
                    ))}
                  </Wrap>
                </VStack>
              </HStack>
            </Link>
          </GridItem>
        ))}
      </SimpleGrid>
    </>
  )
}
