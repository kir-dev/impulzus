import { PageHeading } from '@/components/common/PageHeading'
import { Title } from '@/components/common/Title'
import { Button, Heading } from '@chakra-ui/react'
import { signIn, signOut, useSession } from 'next-auth/react'

export default function LoginPage() {
  const { data, status, update } = useSession()

  console.log(data)
  return (
    <>
      <Title text={status === 'authenticated' ? 'Profil' : 'Bejelentkezés'} />
      <PageHeading text={status === 'authenticated' ? 'Profil' : 'Belépés'} />
      <Heading mb={4}>{data?.user?.isAdmin ? 'admin' : 'nem admin'}</Heading>
      {status === 'authenticated' ? (
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
