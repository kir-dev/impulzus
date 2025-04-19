import { PageHeading } from '@/components/common/PageHeading'
import { Title } from '@/components/common/Title'
import { BlogSidebar } from '@/components/landing/BlogSidebar' // see below
import { LatestNewspaperCard } from '@/components/landing/LatestNewspaperCard'
import { getLatestBlogPosts } from '@/util/blog/actions' // you'll create this
import { getLatestNewspaper } from '@/util/newspapers/actions'
import { Flex, Heading, Text } from '@chakra-ui/react'
import { getTranslations } from 'next-intl/server'

const Page = async () => {
  const t = await getTranslations()
  const latestNewspaper = await getLatestNewspaper()
  const latestPosts = await getLatestBlogPosts()

  return (
    <>
      <Title />
      <PageHeading text={t('title')} />
      <Heading mb={4} size="lg" variant="h2">
        {t('newImpulzus')}
      </Heading>
      <Text mb={6}>{t('description')}</Text>

      <Flex gap={8} direction={['column', 'row']} align="space-between" justify={'space-between'}>
        {latestNewspaper && <LatestNewspaperCard newspaper={latestNewspaper} />}
        <BlogSidebar posts={latestPosts} />
      </Flex>
    </>
  )
}

export default Page
