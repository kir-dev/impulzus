import Book from '@/components/archive/book'
import prisma from '@/lib/prisma'
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
  console.log(newspaper)

  return (
    <>
      <h1>EZ EGY ÚJSÁG</h1>
      <p>{newspaper.id + ' ' + newspaper.title + ' ' + newspaper.contents + ' ' + newspaper.ISSUU_Link}</p>
      <Book />
    </>
  )
}
