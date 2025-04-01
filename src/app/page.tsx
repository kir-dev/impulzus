import { PageHeading } from '@/components/common/PageHeading'
import { Title } from '@/components/common/Title'
import { Heading, Text } from '@chakra-ui/react'
import { useTranslations } from 'next-intl'

const Page = () => {
  const t = useTranslations()

  return (
    <>
      <Title />
      <PageHeading text={t('title')} />
      <Heading mb={4} size="lg" variant="h2">
        {t('newImpulzus')}
      </Heading>
      <Text>{t('description')}</Text>
    </>
  )
}

export default Page
