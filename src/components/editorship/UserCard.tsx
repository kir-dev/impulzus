import { UserEntity } from '@/pages/api/users/dto/UserEntity.dto'
import { PATHS } from '@/util/paths'
import { Box, HStack, Tag, Text, VStack, Wrap } from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import Router from 'next/router'
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
    <Box>
      <Link key={user.id} href={PATHS.EDITORSHIP + '/' + user.id}>
        <HStack p={1}>
          <Image height={150} width={150} alt="profile_pic" src={user.picture ?? '/img/impulzus_logo_light.png'} />
          <VStack align="flex-start">
            <Text>{user.fullName}</Text>
            <Text>{user.email}</Text>
            <Wrap>
              {user.titles?.map((t) => (
                <Tag key={t} m={0.5}>
                  {t}
                </Tag>
              ))}
            </Wrap>
          </VStack>
        </HStack>
      </Link>
      <EditorshipModalButton
        _id={user.id}
        _name={user.fullName}
        _email={user.email}
        _titles={user.titles}
        _picture={user.picture ?? undefined}
      />
      <ConfirmDialogButton
        bodyText="Biztosan törlöd a felhasználót?"
        confirmAction={() => deleteData(user.id)}
        headerText="Felhasználó törlése"
        confirmButtonText="Törlés"
      />
    </Box>
  )
}
