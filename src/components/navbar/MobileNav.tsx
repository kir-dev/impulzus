import { VStack } from '@chakra-ui/react'
import Link from 'next/link'
import { NAV_ITEMS } from './navitems'

type Props = {
  onNavigate: () => void
}

export const MobileNav = ({ onNavigate }: Props) => {
  return (
    <VStack display={{ base: 'flex', lg: 'none' }} ml="1.5rem" mb="1rem" alignItems="flex-start">
      {NAV_ITEMS.map((item) => (
        <Link onClick={onNavigate} key={item.text + item.href} href={item.href}>
          {item.text}
        </Link>
      ))}
    </VStack>
  )
}
