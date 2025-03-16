'use client'
import { UserEntity } from '@/models/UserEntity'
import { HStack, Stack, Tag, Text, VStack, Wrap } from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Router from 'next/router'
import { FaRegEnvelope } from 'react-icons/fa'
import { ConfirmDialogButton } from '../common/ConfirmDialogButton'
import { EditorshipModalButton } from './EditorshipModalButton'

type Props = {
  user: UserEntity
}

export const UserCard = ({ user }: Props) => {
  const t = useTranslations()
  const { data } = useSession()
  const isAdmin = data?.user?.isAdmin

  const deleteData = async (id: string) => {
    try {
      await fetch('/api/users/' + id, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      })
      Router.replace(Router.asPath)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Stack justify="space-between" direction={['column', 'row']}>
      <Stack p={1} direction={{ base: 'column', md: 'row' }} alignItems={{ base: 'center', sm: 'flex-start' }}>
        <Image height={150} width={150} alt="profile_pic" src={user.picture || '/img/impulzus_logo_light.png'} />
        <VStack align="flex-start" alignSelf="flex-start">
          <Text fontSize="3xl">{user.name}</Text>
          <HStack wordBreak="break-word">
            <FaRegEnvelope style={{ minWidth: '16px' }} />
            <Text>{user.email}</Text>
          </HStack>
          <Wrap>
            {user.titles &&
              user.titles[0] != '' &&
              user.titles.map((t) => (
                <Tag key={t} m={0.5}>
                  {t}
                </Tag>
              ))}
          </Wrap>
        </VStack>
      </Stack>

      {isAdmin && (
        <Stack direction={['row', 'column']} alignSelf={['center', 'flex-start']}>
          <EditorshipModalButton user={user} />
          <ConfirmDialogButton
            bodyText={t('editorship.deleteUserQuestion')}
            confirmAction={() => deleteData(user.id)}
            headerText={t('editorship.deleteUser')}
            confirmButtonText={t('common.delete')}
            refuseButtonText={t('common.cancel')}
          />
        </Stack>
      )}
    </Stack>
  )
}
