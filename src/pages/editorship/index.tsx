import { PageHeading } from '@/components/common/PageHeading'
import { Title } from '@/components/common/Title'
import { UserCard } from '@/components/editorship/UserCard'
import prisma from '@/lib/prisma'
import { PATHS } from '@/util/paths'
import { SimpleGrid } from '@chakra-ui/react'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import { UserEntity } from '../api/users/dto/UserEntity.dto'

export const getStaticProps: GetStaticProps = async () => {
  const users = await prisma.user.findMany()

  return {
    props: { users },
    revalidate: 10
  }
}

type Props = {
  users: UserEntity[]
}

export default function Editorship({ users }: Props) {
  const leadership = users.map((u) => u.titles.some((t) => t === ''))
  return (
    <>
      <Title text="Szerkesztőség" />
      <PageHeading text="Vezetőség" />
      <SimpleGrid columns={[1, null, 2]} mb={8}>
        {users.map((u) => (
          <Link key={u.id} href={PATHS.EDITORSHIP + '/' + u.id}>
            <UserCard user={u} />
          </Link>
        ))}
      </SimpleGrid>
      <PageHeading text="Szerkesztőség" />
      <SimpleGrid columns={[1, null, 2]}>
        {users.map((u) => (
          <UserCard key={u.id} user={u} />
        ))}
      </SimpleGrid>
    </>
  )
}
