import PdfRenderer from '@/components/archive/PdfReader'
import { BackButton } from '@/components/common/BackButton'
import { PageHeading } from '@/components/common/PageHeading'
import { Title } from '@/components/common/Title'
import prisma from '@/lib/prisma'
import { PATHS } from '@/util/paths'
import { Flex } from '@chakra-ui/react'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { redirect } from 'next/navigation'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations()

  return {
    title: `Impulzus | ${t('navitems.archive')}`
  }
}

export default async function NewsPaperPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const newspaper = await prisma.newspaper.findUnique({
    where: {
      id: Number(id)
    }
  })
  if (!newspaper) {
    redirect('/archive')
  }
  return (
    <>
      <Title text={newspaper.title} />
      <PageHeading text={newspaper.title} />
      <Flex mb={4} justify="center">
        <PdfRenderer fileURL={newspaper.pdf ?? ''} />
      </Flex>
      <BackButton link={PATHS.ARCHIVE} />
    </>
  )
}
