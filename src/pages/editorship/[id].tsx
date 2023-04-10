import prisma from '@/lib/prisma'
import { Text } from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import { UserEntity } from '../api/users/dto/UserEntity.dto'

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const user = await prisma.user.findUnique({
    where: {
      id: Number(params?.id)
    }
  })

  return {
    props: { user }
  }
}

type Props = {
  user: UserEntity
}

export default function Editorship({ user }: Props) {
  console.log(user)
  return (
    <>
      <Text>{user.fullName}</Text>
      <Text>{user.email}</Text>
    </>
  )
}
