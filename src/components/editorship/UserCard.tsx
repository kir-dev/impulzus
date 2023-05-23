import { UserEntity } from '@/pages/api/users/dto/UserEntity.dto'
import { PATHS } from '@/util/paths'
import { Flex, HStack, Stack, Tag, Text, VStack, Wrap } from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import Router from 'next/router'
import { FaRegEnvelope } from 'react-icons/fa'
import { ConfirmDialogButton } from '../common/ConfirmDialogButton'
import { EditorshipModalButton } from './EditorshipModalButton'

type Props = {
  user: UserEntity
}

export const UserCard = ({ user }: Props) => {
  const { data } = useSession()

  const deleteData = async (id: string) => {
    try {
      await fetch('/api/users/' + id, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      })
      Router.reload()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Flex justify="space-between">
      <Link key={user.id} href={PATHS.EDITORSHIP + '/' + user.id}>
        <Stack p={1} direction={{ base: 'column', md: 'row' }}>
          <Image height={150} width={150} alt="profile_pic" src={user.picture ?? '/img/impulzus_logo_light.png'} />
          <VStack align="flex-start">
            <Text fontSize="3xl">{user.name}</Text>
            <HStack>
              <FaRegEnvelope />
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
      </Link>
      <VStack>
        <EditorshipModalButton user={user} />
        <ConfirmDialogButton
          bodyText="Biztosan törlöd a felhasználót?"
          confirmAction={() => deleteData(user.id)}
          headerText="Felhasználó törlése"
          confirmButtonText="Törlés"
        />
      </VStack>
    </Flex>
  )
}
