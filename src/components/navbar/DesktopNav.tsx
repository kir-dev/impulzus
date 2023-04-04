import { HStack } from '@chakra-ui/react'
import Link from 'next/link'
import { NAV_ITEMS } from './navitems'

export const DesktopNav = () => {
  return (
    <HStack spacing={8}>
      {NAV_ITEMS.map((item) => (
        <Link key={item.text + item.href} href={item.href}>
          {item.text}
        </Link>
      ))}
    </HStack>
  )
}
