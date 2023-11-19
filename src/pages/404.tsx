import { Stack, Text } from '@chakra-ui/react'
import useTranslation from 'next-translate/useTranslation'

export default function Custom404() {
  const { t } = useTranslation('common')

  return (
    <Stack my={8} align="center">
      <Text fontWeight="bold">404 - {t('notFound')}</Text>
    </Stack>
  )
}
