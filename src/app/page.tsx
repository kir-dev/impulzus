import { Title } from '@/components/common/Title'
import { BlogSidebar } from '@/components/landing/BlogSidebar' // see below
import LandingDetails from '@/components/landing/LandingDetails'
import { LatestNewspaperCard } from '@/components/landing/LatestNewspaperCard'
import { NextMeetingBox } from '@/components/landing/NextMeetingBox'
import { prisma } from '@/lib/prisma'
import { getLatestBlogPosts } from '@/util/blog/actions' // you'll create this
import { getMeeting } from '@/util/meeting/actions'
import { getLatestNewspaper } from '@/util/newspapers/actions'
import { Grid, GridItem } from '@chakra-ui/react'
import { getServerSession } from 'next-auth'
import { getTranslations } from 'next-intl/server'
import { authOptions } from './api/auth/[...nextauth]/authOptions'

const Page = async () => {
  const t = await getTranslations()
  const latestNewspaper = await getLatestNewspaper()
  const latestPosts = await getLatestBlogPosts()
  const meeting = await getMeeting()
  const session = await getServerSession(authOptions)
  const isAdmin = !!session?.user?.isAdmin
  const description = await prisma.impressum.findFirst({
    where: {
      id: 1
    }
  })
  const content = description?.details || ''
  return (
    <>
      <Title />
      <Grid templateColumns={['1fr', null, '2fr 1.2fr']} gap={8} alignItems="start" mb={8}>
        {/* Left Column: Heading + Description */}
        <LandingDetails content={content} isAdmin={isAdmin} />

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
