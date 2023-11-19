import { PageHeading } from '@/components/common/PageHeading'
import { Title } from '@/components/common/Title'
import { Heading, Text } from '@chakra-ui/react'
import useTranslation from 'next-translate/useTranslation'
import { NextPageWithLayout } from './_app'

const Page: NextPageWithLayout = () => {
  const { t } = useTranslation('common')

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
