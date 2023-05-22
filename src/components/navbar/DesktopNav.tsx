import { HStack } from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { NAV_ITEMS } from './navitems'

export const DesktopNav = () => {
  const { status } = useSession()

  return (
    <HStack spacing={8}>
      {NAV_ITEMS.map((item) => (
        <Link key={item.text + item.href} href={item.href}>
          {item.text == 'Belépés' && status === 'authenticated' ? 'Kilépés' : item.text}
        </Link>
      ))}
    </HStack>
  )
}
