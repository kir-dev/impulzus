import { Box, Divider, Heading, Text, VStack } from '@chakra-ui/react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

type PostEntity = {
  id: number
  title: string
  previewContent: string
  content: string
  categories: string[]
  tag: string[]
  createdAt: Date
  userId: string
}

type BlogSidebarProps = {
  posts: PostEntity[]
}

export const BlogSidebar = ({ posts }: BlogSidebarProps) => {
  const t = useTranslations()
  if (!posts || posts.length === 0) {
    return null
  }
  return (
    <Box w="fit-content" maxW="400px" p={4}>
      <Heading size="lg" mb={4}>
        {t('blog.latestPosts')}
      </Heading>

      <VStack spacing={6} align="start">
        {posts.slice(0, 4).map((post) => (
          <Link href={`/blog/${post.id}`} key={post.id} style={{ width: '100%' }}>
            <Box>
              <Text fontSize="md" mt={1} as="b">
                {post.title}
              </Text>
              <br />
              <Text fontSize="xs" mt={1} as="i">
                {new Date(post.createdAt).toLocaleDateString()}
              </Text>
              <Text fontSize="md" mt={1} noOfLines={3}>
                {post.previewContent}
              </Text>
              <Divider mt={3} />
            </Box>
          </Link>
        ))}
      </VStack>
    </Box>
  )
}
