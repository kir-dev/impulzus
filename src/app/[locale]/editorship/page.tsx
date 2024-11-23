import { PageHeading } from '@/components/common/PageHeading'
import { Title } from '@/components/common/Title'
import { EditorshipModalButton } from '@/components/editorship/EditorshipModalButton'
import { UserGrid } from '@/components/editorship/UserGrid'
import prisma from '@/lib/prisma'
import { Flex } from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import { useSession } from 'next-auth/react'
import { UserEntity } from '../../models/UserEntity'

export const getServerSideProps: GetServerSideProps = async () => {
  const users = await prisma.user.findMany()

  return {
    props: { users }
  }
}

type Props = {
  users: UserEntity[]
}

export default function Editorship({ users }: Props) {
  const { data } = useSession()
  const t = useTranslations()
  const isAdmin = data?.user?.isAdmin

  const impulzusUsers = users.filter((u) => u.titles && u.titles.length > 0)

  return (
    <>
      <Title text={t('editorship.title')} />
      <PageHeading text={t('editorship.leadership')} />
      {isAdmin && (
        <Flex mb={4} justify="flex-end">
          <EditorshipModalButton />
        </Flex>
      )}
      <UserGrid mb={8} users={impulzusUsers.filter((u) => u.isBoardMember)} />
      <PageHeading text={t('editorship.title')} />
      <UserGrid users={impulzusUsers.filter((u) => !u.isBoardMember)} />
    </>
  )
}
