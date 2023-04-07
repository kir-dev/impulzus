import { UserEntity } from '@/pages/api/users/dto/UserEntity.dto'
import { HStack, Image, Tag, Text, VStack, Wrap } from '@chakra-ui/react'

type Props = {
  user: UserEntity
}

export const UserCard = ({ user }: Props) => {
  const tags = ['Író', 'Korrektor', 'Korrektor2', 'Korrekto', 'Korrekto2']

  return (
    <HStack p={1}>
      <Image maxH={100} src="https://bit.ly/dan-abramov" />
      <VStack align="flex-start">
        <Text>{user.fullName}</Text>
        <Text>{user.email}</Text>
        <Wrap>
          {tags.map((t) => (
            <Tag key={t} m={0.5}>
              {t}
            </Tag>
          ))}
        </Wrap>
      </VStack>
    </HStack>
  )
}
