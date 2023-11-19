import { PageHeading } from '@/components/common/PageHeading'
import { Title } from '@/components/common/Title'
import { EditorshipModalButton } from '@/components/editorship/EditorshipModalButton'
import { UserGrid } from '@/components/editorship/UserGrid'
import prisma from '@/lib/prisma'
import { Flex } from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import { useSession } from 'next-auth/react'
import useTranslation from 'next-translate/useTranslation'
import { UserEntity } from '../api/users/dto/UserEntity.dto'

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
  const { t } = useTranslation('common')
  const isAdmin = data?.user?.isAdmin

  return (
    <>
      <Title text={t('editorship.title')} />
      <PageHeading text={t('editorship.leadership')} />
      {isAdmin && (
        <Flex mb={4} justify="flex-end">
          <EditorshipModalButton />
        </Flex>
      )}
      <UserGrid users={users.filter((u) => u.isBoardMember)} />
      <PageHeading text={t('editorship.title')} />
      <UserGrid users={users.filter((u) => !u.isBoardMember)} />
    </>
  )
}
