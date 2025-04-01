'use client'
import { getUserLocale, setUserLocale } from '@/services/locale'
import { Button, useColorModeValue } from '@chakra-ui/react'
import { useLocale } from 'next-intl'
import { startTransition } from 'react'

export const LanguageSwitcher = () => {
  const locale = useLocale()
  const switchLocale = async () => {
    const locale = (await getUserLocale()) === 'en' ? 'hu' : 'en'
    startTransition(() => {
      setUserLocale(locale)
    })
  }
  const nextLocale = locale === 'hu' ? 'en' : 'hu'
  return (
    <Button
      size="md"
      p={0}
      fontSize={{ base: 'lg', md: 'xl' }}
      variant="ghost"
      onClick={switchLocale}
      aria-label={`Switch to ${locale}`}
      color={useColorModeValue('black', 'white')}
    >
      {nextLocale}
    </Button>
  )
}
