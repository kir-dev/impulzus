import { PageHeading } from '@/components/common/PageHeading'
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
    title: `Impulzus | ${t('about.aboutUs')}`
  }
}

export default async function AuthorsPage() {
  const t = await getTranslations()
  const locale = (await getUserLocale()) === 'en' ? 'hu' : 'en'
  const text = await getText(TextType.AboutUs)
  const session = await getServerSession(authOptions)
  const isAdmin = session?.user?.isAdmin ?? false
  if (!text) {
    return null
  }

  return (
    <div>
      <PageHeading text={t('about.aboutUs')} />
      <CustomPage text={text} isAdmin={isAdmin} locale={locale} />
    </div>
  )
}
