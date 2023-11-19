import { Button, HStack } from '@chakra-ui/react'
import { signIn, useSession } from 'next-auth/react'
import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'
import { NAV_ITEMS } from './navitems'

export const DesktopNav = () => {
  const { status } = useSession()
  const { t } = useTranslation('common')

  return (
    <HStack spacing={8}>
      {NAV_ITEMS.map((item) => {
        if (item.text === 'login' && status !== 'authenticated') {
          return (
            <Button
              p={0}
              background="inherit"
              _hover={{ background: 'inherit' }}
              fontWeight="normal"
              onClick={() => signIn()}
              key={item.text + item.href}
            >
              {t('navitems.' + item.text)}
            </Button>
          )
        }
        return (
          <Link key={item.text + item.href} href={item.href}>
            {item.text === 'login' && status === 'authenticated' ? t('navitems.profile') : t('navitems.' + item.text)}
          </Link>
        )
      })}
    </HStack>
  )
}
