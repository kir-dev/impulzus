import { Title } from '@/components/common/Title'
import prisma from '@/lib/prisma'
import { Tag, Text } from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import Image from 'next/image'
import { UserEntity } from '../api/users/dto/UserEntity.dto'

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const user = await prisma.user.findUnique({
    where: {
      id: params?.id?.toString()
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
  return (
    <>
      <Title text={user.name ?? ''} />
      <Image height={100} width={100} alt="profile_pic" src={user.picture ? user.picture : '/img/impulzus_logo_light.png'} />
      <Text>{user.name}</Text>
      <Text>{user.email}</Text>
      {user.titles?.map((t) => (
        <Tag transform="auto" skewX={3} key={t} m={0.5}>
          {t}
        </Tag>
      ))}
    </>
  )
}
