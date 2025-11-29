import { PageHeading } from '@/components/common/PageHeading'
import { Title } from '@/components/common/Title'
import CustomPage from '@/components/editorship/CustomPage'
import { TextType } from '@/models/GenericTypes'
import { getUserLocale } from '@/services/locale'
import { getText } from '@/util/texts/actions'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { getTranslations } from 'next-intl/server'
import { authOptions } from '../api/auth/[...nextauth]/authOptions'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations()

  return {
    title: `Impulzus | ${t('editorship.impressum')}`
  }
}

export default async function AuthorsPage() {
  const t = await getTranslations()
  const locale = (await getUserLocale()) === 'en' ? 'hu' : 'en'
  const impressum = await getText(TextType.Impressum)
  const session = await getServerSession(authOptions)
  const isAdmin = session?.user?.isAdmin ?? false
  if (!impressum) {
    return null
  }
  return (
    <>
      <Title text={t('editorship.impressum')} />
      <PageHeading text={t('editorship.impressum')} />
      <CustomPage text={impressum} isAdmin={isAdmin} locale={locale} />
    </>
  )
}
