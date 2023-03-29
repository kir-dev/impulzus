import prisma from '@/lib/prisma'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import { NewspaperEntity } from '../api/newspapers/dto/NewspaperEntity.dto'

export const getStaticProps: GetStaticProps = async () => {
  const newspapers = await prisma.newspaper.findMany()

  return {
    props: { newspapers },
    revalidate: 10
  }
}

type Props = {
  newspapers: NewspaperEntity[]
}

export default function Archive({ newspapers }: Props) {
  console.log(newspapers)
  return (
    <>
      <h1>Archívum</h1>
      {newspapers.map((n) => (
        <div key={n.id}>
          <Link href={`/archive/${n.id}`}>{n.id + ' ' + n.title}</Link>
        </div>
      ))}
    </>
  )
}
