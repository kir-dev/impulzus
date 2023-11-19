import { PageHeading } from '@/components/common/PageHeading'
import { Title } from '@/components/common/Title'
import { Button, Heading } from '@chakra-ui/react'
import { signIn, signOut, useSession } from 'next-auth/react'
import useTranslation from 'next-translate/useTranslation'

export default function LoginPage() {
  const { t } = useTranslation('common')
  const { data, status } = useSession()
  const isAuthenticated = status === 'authenticated'

  return (
    <>
      <Title text={isAuthenticated ? t('login.profile') : t('login.title')} />
      <PageHeading text={isAuthenticated ? t('login.profile') : t('login.title')} />
      <Heading mb={4}>{isAuthenticated ? data?.user?.name : t('login.logInWithAuthSch')}</Heading>
      {isAuthenticated ? (
        <Button onClick={() => signOut({ callbackUrl: '/' })}>{t('login.authSchLogout')}</Button>
      ) : (
        <Button onClick={() => signIn()}>{t('login.authSchLogin')}</Button>
      )}
    </>
  )
}
