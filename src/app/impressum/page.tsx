import { PageHeading } from '@/components/common/PageHeading'
import { Title } from '@/components/common/Title'
import Impressum from '@/components/editorship/Impressum'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { getTranslations } from 'next-intl/server'
import { authOptions } from '../api/auth/[...nextauth]/authOptions'

export default async function ImpressumPage() {
  const t = await getTranslations()
  const impressum = await prisma.impressum.findFirst({
    where: {
      id: 0
    }
  })
  const session = await getServerSession(authOptions)
  const isAdmin = session?.user?.isAdmin ?? false
  if (!impressum) {
    return null
  }

  return (
    <>
      <Title text={t('editorship.impressum')} />
      <PageHeading text={t('editorship.impressum')} />
      <Impressum impressum={impressum} isAdmin={isAdmin} />
    </>
  )
}
