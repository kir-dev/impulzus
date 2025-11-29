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
    title: `Impulzus | ${t('authors.authors')}`
  }
}

export default async function AuthorsPage() {
  const t = await getTranslations()
  const locale = (await getUserLocale()) === 'en' ? 'hu' : 'en'
  const text = await getText(TextType.Authors)
  const session = await getServerSession(authOptions)
  const isAdmin = session?.user?.isAdmin ?? false
  if (!text) {
    return null
  }

  return (
    <>
      <Title text={t('navitems.authors')} />
      <PageHeading text={t('navitems.authors')} />
      <CustomPage text={text} isAdmin={isAdmin} locale={locale} />
    </>
  )
}
