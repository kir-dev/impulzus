import PdfRenderer from '@/components/archive/PdfReader'
import { PageHeading } from '@/components/common/PageHeading'
import { Title } from '@/components/common/Title'
import prisma from '@/lib/prisma'
import { Box, Flex } from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import { NewspaperEntity } from '../api/newspapers/dto/NewspaperEntity.dto'

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
      <Box width="100%">
        <Flex justify="center">
          <PdfRenderer path={newspaper.pdf ?? '' /* TODO */} />
        </Flex>
      </Box>
    </>
  )
}
