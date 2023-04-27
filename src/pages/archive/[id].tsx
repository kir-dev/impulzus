import PdfRenderer from '@/components/archive/PdfReader'
import { Title } from '@/components/common/Title'
import { Box } from '@chakra-ui/react'

/*export const getServerSideProps: GetServerSideProps = async ({ params }) => {
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
}*/

export default function NewsPaperPage(/*{ newspaper }: Props*/) {
  //console.log(newspaper)

  return (
    <>
      <Title text="{newspaper.title}" />
      <Box width="100%">
        <PdfRenderer />
      </Box>
    </>
  )
}
