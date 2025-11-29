import { Title } from '@/components/common/Title'
import { BlogSidebar } from '@/components/landing/BlogSidebar' // see below
import LandingDetails from '@/components/landing/LandingDetails'
import { LatestNewspaperCard } from '@/components/landing/LatestNewspaperCard'
import { NextMeetingBox } from '@/components/landing/NextMeetingBox'
import { TextType } from '@/models/GenericTypes'
import { getUserLocale } from '@/services/locale'
import { getLatestBlogPosts } from '@/util/blog/actions' // you'll create this
import { getMeeting } from '@/util/meeting/actions'
import { getLatestNewspaper } from '@/util/newspapers/actions'
import { getText } from '@/util/texts/actions'
import { Grid, GridItem } from '@chakra-ui/react'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/authOptions'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Impulzus`
  }
}

const Page = async () => {
  const locale = (await getUserLocale()) === 'en' ? 'hu' : 'en'
  const latestNewspaper = await getLatestNewspaper()
  const latestPosts = await getLatestBlogPosts()
  const meeting = await getMeeting()
  const session = await getServerSession(authOptions)
  const isAdmin = !!session?.user?.isAdmin
  const description = await getText(TextType.WelcomeDescription)
  const descriptionLocale = locale === 'hu' ? description?.contentHu : description?.contentEn
  const content = descriptionLocale || ''
  return (
    <>
      <Title />
      <Grid templateColumns={['1fr', null, '2fr 1.2fr']} gap={8} alignItems="start" mb={8}>
        {/* Left Column: Heading + Description */}
        <LandingDetails content={content} isAdmin={isAdmin} locale={locale} />

        {/* Right Column: Meeting box */}
        <GridItem alignSelf={'center'}>
          <NextMeetingBox meeting={meeting} isAdmin={isAdmin} />
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
