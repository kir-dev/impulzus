import { PageHeading } from '@/components/common/PageHeading'
import { Title } from '@/components/common/Title'
import { EditorshipModalButton } from '@/components/editorship/EditorshipModalButton'
import { UserGrid } from '@/components/editorship/UserGrid'
import prisma from '@/lib/prisma'
import { Flex } from '@chakra-ui/react'
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
  return (
    <>
      <Title text="Szerkesztőség" />
      <PageHeading text="Vezetőség" />
      <Flex mb={4} justify="flex-end">
        <EditorshipModalButton />
      </Flex>
      <UserGrid users={users.filter((u) => u.isBoardMember)} />
      <PageHeading text="Szerkesztőség" />
      <UserGrid users={users.filter((u) => !u.isBoardMember)} />
    </>
  )
}
