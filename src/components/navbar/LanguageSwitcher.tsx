import { Button, useColorModeValue } from '@chakra-ui/react'
import setLanguage from 'next-translate/setLanguage'
import useTranslation from 'next-translate/useTranslation'

export const LanguageSwitcher = () => {
  const { lang } = useTranslation()
  const nextLang = lang === 'hu' ? 'en' : 'hu'
  return (
    <Button
      size="md"
      p={0}
      fontSize={{ base: 'lg', md: 'xl' }}
      variant="ghost"
      onClick={async () => await setLanguage(nextLang)}
      aria-label={`Switch to ${lang}`}
      color={useColorModeValue('black', 'white')}
    >
      {nextLang}
    </Button>
  )
}
