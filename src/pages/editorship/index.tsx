import { PageHeading } from '@/components/common/PageHeading'
import { Title } from '@/components/common/Title'
import { EditorshipModalButton } from '@/components/editorship/EditorshipModalButton'
import { UserCard } from '@/components/editorship/UserCard'
import prisma from '@/lib/prisma'
import { Flex, GridItem, SimpleGrid } from '@chakra-ui/react'
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
      <Flex mb={4} justify="flex-end">
        <EditorshipModalButton />
      </Flex>
      <SimpleGrid spacing={10} columns={{ base: 1, xl: 2 }} mb={8}>
        {users
          .filter((u) => u.isBoardMember)
          .map((u) => (
            <GridItem borderWidth={1} borderRadius={5} p={2} key={u.id}>
              <UserCard user={u} />
            </GridItem>
          ))}
      </SimpleGrid>
      <PageHeading text="Szerkesztőség" />
      <SimpleGrid spacing={10} columns={[1, 1, 2]}>
        {users
          .filter((u) => !u.isBoardMember)
          .map((u) => (
            <GridItem borderWidth={1} borderRadius={5} p={2} key={u.id}>
              <UserCard key={u.id} user={u} />
            </GridItem>
          ))}
      </SimpleGrid>
    </>
  )
}
