import { PageHeading } from '@/components/common/PageHeading'
import { Title } from '@/components/common/Title'
import { UserCard } from '@/components/editorship/UserCard'
import { Button, Heading } from '@chakra-ui/react'
import { signIn, signOut, useSession } from 'next-auth/react'

export default function LoginPage() {
  const { data, status, update } = useSession()
  const isAuthenticated = status === 'authenticated'

  console.log(data)
  return (
    <>
      <Title text={isAuthenticated ? 'Profil' : 'Bejelentkezés'} />
      <PageHeading text={isAuthenticated ? 'Profil' : 'Belépés'} />
      {isAuthenticated ? <UserCard user={data!!.user!!}></UserCard> : <Heading mb={4}>Jelentkezz be AuthSCH fiókkal!</Heading>}

      {isAuthenticated ? (
        <Button transform="auto" skewX={5} onClick={() => signOut()}>
          AuthSCH kijelentkezés
        </Button>
      ) : (
        <Button transform="auto" skewX={5} onClick={() => signIn()}>
          AuthSCH bejelentkezés
        </Button>
      )}
    </>
  )
}
