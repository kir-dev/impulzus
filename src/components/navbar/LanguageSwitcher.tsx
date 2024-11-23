'use client'
import { useRouter } from '@/i18n/routing'
import { Button, useColorModeValue } from '@chakra-ui/react'
import { useLocale } from 'next-intl'

export const LanguageSwitcher = () => {
  const locale = useLocale()
  const router = useRouter()
  const nextLocale = locale === 'hu' ? 'en' : 'hu'
  return (
    <Button
      size="md"
      p={0}
      fontSize={{ base: 'lg', md: 'xl' }}
      variant="ghost"
      onClick={async () =>
        router.replace(
          // @ts-expect-error -- TypeScript will validate that only known `params`
          // are used in combination with a given `pathname`. Since the two will
          // always match for the current route, we can skip runtime checks.
          { pathname, params },
          { locale: nextLocale }
        )
      }
      aria-label={`Switch to ${locale}`}
      color={useColorModeValue('black', 'white')}
    >
      {nextLocale}
    </Button>
  )
}
