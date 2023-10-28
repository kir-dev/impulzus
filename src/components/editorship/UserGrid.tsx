import { UserEntity } from '@/pages/api/users/dto/UserEntity.dto'
import { GridItem, SimpleGrid } from '@chakra-ui/react'
import { UserCard } from './UserCard'

type Props = {
  users: UserEntity[]
}

export const UserGrid = ({ users }: Props) => {
  return (
    <SimpleGrid mb={4} spacing={10} columns={{ base: 1, xl: 2 }}>
      {users.map((u) => (
        <GridItem borderWidth={1} borderRadius={5} p={2} key={u.id}>
          <UserCard key={u.id} user={u} />
        </GridItem>
      ))}
    </SimpleGrid>
  )
}
