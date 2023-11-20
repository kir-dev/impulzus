import { UserEntity } from '@/models/UserEntity'
import { GridItem, SimpleGrid } from '@chakra-ui/react'
import { UserCard } from './UserCard'

type Props = {
  users: UserEntity[]
  mb?: number
}

export const UserGrid = ({ users, mb = 4 }: Props) => {
  return (
    <SimpleGrid mb={mb} spacing={10} columns={{ base: 1, xl: 2 }}>
      {users.map((u) => (
        <GridItem borderWidth={1} borderRadius={5} p={2} key={u.id}>
          <UserCard key={u.id} user={u} />
        </GridItem>
      ))}
    </SimpleGrid>
  )
}
