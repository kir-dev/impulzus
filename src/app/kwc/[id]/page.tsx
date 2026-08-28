import { BackButton } from '@/components/common/BackButton'
import { PageHeading } from '@/components/common/PageHeading'
import { Title } from '@/components/common/Title'
import prisma from '@/lib/prisma'
import { PATHS } from '@/util/paths'
import { Box, Text } from '@chakra-ui/react'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import { redirect } from 'next/navigation'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations()

  return {
    title: `Impulzus | ${t('navitems.kwc')}`
  }
}

export default async function SolutionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const solution = await prisma.solution.findUnique({
    where: {
      id: Number(id)
    }
  })
  if (!solution) {
    redirect('/kwc')
  }
  return (
    <>
      <Title text={solution.title} />
      <PageHeading text={solution.title} />
      {solution.image && (
        <Box mb={6} display="flex" justifyContent="center">
          <Image
            src={solution.image}
            alt={solution.title}
            width={1200}
            height={675}
            unoptimized
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </Box>
      )}
      <Box whiteSpace="pre-wrap" mb={6}>
        <Text>{solution.content}</Text>
      </Box>
      <BackButton link={PATHS.KWC} />
    </>
  )
}
