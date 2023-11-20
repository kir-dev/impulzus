import PdfRenderer from '@/components/archive/PdfReader'
import { BackButton } from '@/components/common/BackButton'
import { PageHeading } from '@/components/common/PageHeading'
import { Title } from '@/components/common/Title'
import prisma from '@/lib/prisma'
import { PATHS } from '@/util/paths'
import { Flex } from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import { NewspaperEntity } from '../../models/NewspaperEntity'

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const newspaper = await prisma.newspaper.findUnique({
    where: {
      id: Number(params?.id)
    }
  })

  if (!newspaper) {
    return { notFound: true }
  }

  return {
    props: { newspaper }
  }
}

type Props = {
  newspaper: NewspaperEntity
}

export default function NewsPaperPage({ newspaper }: Props) {
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
