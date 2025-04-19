import { PageHeading } from '@/components/common/PageHeading'
import { Title } from '@/components/common/Title'
import { BlogSidebar } from '@/components/landing/BlogSidebar' // see below
import { LatestNewspaperCard } from '@/components/landing/LatestNewspaperCard'
import { NextMeetingBox } from '@/components/landing/NextMeetingBox'
import { getLatestBlogPosts } from '@/util/blog/actions' // you'll create this
import { getMeeting } from '@/util/meeting/actions'
import { getLatestNewspaper } from '@/util/newspapers/actions'
import { Grid, GridItem, Heading, Text } from '@chakra-ui/react'
import { getTranslations } from 'next-intl/server'

const Page = async () => {
  const t = await getTranslations()
  const latestNewspaper = await getLatestNewspaper()
  const latestPosts = await getLatestBlogPosts()
  const meeting = await getMeeting()
  return (
    <>
      <Title />
      <Grid templateColumns={['1fr', null, '2fr 1.2fr']} gap={8} alignItems="start" mb={8}>
        {/* Left Column: Heading + Description */}
        <GridItem>
          <PageHeading text={t('title')} />
          <Heading mb={4} size="lg" variant="h2">
            {t('newImpulzus')}
          </Heading>
          <Text mb={6}>{t('description')}</Text>
        </GridItem>

        {/* Right Column: Meeting box */}
        <GridItem alignSelf={'center'}>
          <NextMeetingBox meeting={meeting} />
        </GridItem>
      </Grid>

      <Grid templateColumns={['1fr', null, '2fr 1.2fr']} gap={8} alignItems="start">
        {/* Left Column: Newspaper */}
        {latestNewspaper && (
          <GridItem>
            <LatestNewspaperCard newspaper={latestNewspaper} />
          </GridItem>
        )}

        {/* Right Column: Blog posts */}
        <GridItem>
          <BlogSidebar posts={latestPosts} />
        </GridItem>
      </Grid>
    </>
  )
}

export default Page
