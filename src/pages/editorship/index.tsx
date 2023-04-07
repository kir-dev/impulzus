import { PageHeading } from '@/components/common/PageHeading'
import { UserCard } from '@/components/editorship/UserCard'
import prisma from '@/lib/prisma'
import { Grid } from '@chakra-ui/react'
import { GetStaticProps } from 'next'
import { UserEntity } from '../api/users/dto/UserEntity.dto'

export const getStaticProps: GetStaticProps = async () => {
  const users = await prisma.user.findMany()

  return {
    props: { users },
    revalidate: 10
  }
}

type Props = {
  users: UserEntity[]
}

export default function Editorship({ users }: Props) {
  console.log(users)
  return (
    <>
      <PageHeading text="Vezetőség" />
      <Grid>
        {users.map((u) => (
          <UserCard key={u.id} user={u} />
        ))}
      </Grid>
      <PageHeading text="Szerkesztőség" />
      <Grid>
        {users.map((u) => (
          <UserCard key={u.id} user={u} />
        ))}
      </Grid>
    </>
  )
}
