import { PageHeading } from '@/components/common/PageHeading'
import { Title } from '@/components/common/Title'
import { EditorshipModalButton } from '@/components/editorship/EditorshipModalButton'
import { UserCard } from '@/components/editorship/UserCard'
import prisma from '@/lib/prisma'
import { SimpleGrid } from '@chakra-ui/react'
import { GetStaticProps } from 'next'
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
  const leadership = users.map((u) => u.titles?.some((t) => t === ''))

  return (
    <>
      <Title text="Szerkesztőség" />
      <PageHeading text="Vezetőség" />
      <EditorshipModalButton />
      <SimpleGrid columns={[1, null, 2]} mb={8}>
        {users.map((u) => (
          <UserCard user={u} />
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
