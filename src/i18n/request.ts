import { getUserLocale } from '@/services/locale'
import { getRequestConfig } from 'next-intl/server'

export default getRequestConfig(async () => {
  // This typically corresponds to the `[locale]` segment
  const locale = await getUserLocale()

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  }
})
