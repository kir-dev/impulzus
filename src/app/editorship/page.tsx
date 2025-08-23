import { PageHeading } from '@/components/common/PageHeading'
import { Title } from '@/components/common/Title'
import { EditorshipModalButton } from '@/components/editorship/EditorshipModalButton'
import { UserGrid } from '@/components/editorship/UserGrid'
import prisma from '@/lib/prisma'
import { Flex } from '@chakra-ui/react'
import { getServerSession } from 'next-auth'
import { getTranslations } from 'next-intl/server'
import { authOptions } from '../api/auth/[...nextauth]/authOptions'

export default async function Editorship() {
  const users = await prisma.user.findMany()
  const session = await getServerSession(authOptions)
  const t = await getTranslations()
  const isAdmin = session?.user?.isAdmin ?? false

  const impulzusUsers = users.filter((u) => u.isMember)
  return (
    <>
      <Title text={t('editorship.title')} />
      <PageHeading text={t('editorship.leadership')} />
      {isAdmin && (
        <Flex mb={4} justify="flex-end">
          <EditorshipModalButton users={users} />
        </Flex>
      )}
      <UserGrid mb={8} users={impulzusUsers.filter((u) => u.isBoardMember)} />
      <PageHeading text={t('editorship.title')} />
      <UserGrid users={impulzusUsers.filter((u) => !u.isBoardMember)} />
    </>
  )
}
