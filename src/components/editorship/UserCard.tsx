import { UserEntity } from '@/pages/api/users/dto/UserEntity.dto'
import { HStack, Tag, Text, VStack, Wrap } from '@chakra-ui/react'
import Image from 'next/image'

type Props = {
  user: UserEntity
}

export const UserCard = ({ user }: Props) => {
  return (
    <HStack p={1}>
      <Image height={100} width={100} alt="profile_pic" src={user.picture ?? '/img/impulzus_logo_light.png'} />
      <VStack align="flex-start">
        <Text>{user.fullName}</Text>
        <Text>{user.email}</Text>
        <Wrap>
          {user.titles.map((t) => (
            <Tag key={t} m={0.5}>
              {t}
            </Tag>
          ))}
        </Wrap>
      </VStack>
    </HStack>
  )
}
