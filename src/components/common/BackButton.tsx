import { Button } from '@chakra-ui/react'
import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'

type Props = {
  link: string
}

export const BackButton = ({ link }: Props) => {
  const { t } = useTranslation('common')

  return (
    <Button as={Link} href={link}>
      {t('common.back')}
    </Button>
  )
}
