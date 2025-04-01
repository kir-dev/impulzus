import { Stack, Text } from '@chakra-ui/react'
import { useTranslations } from 'next-intl'

export default function Custom404() {
  const t = useTranslations()

  return (
    <Stack my={8} align="center">
      <Text fontWeight="bold">404 - {t('notFound')}</Text>
    </Stack>
  )
}
