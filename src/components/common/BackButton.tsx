import { Button } from '@chakra-ui/react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

type Props = {
  link: string
}

export const BackButton = ({ link }: Props) => {
  const t = useTranslations()

  return (
    <Button as={Link} href={link}>
      {t('common.back')}
    </Button>
  )
}
