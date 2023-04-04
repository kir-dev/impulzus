import { Box } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'
import { Footer } from './footer'
import { Navbar } from './navbar/navbar'

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Navbar />
      <main>
        <Box p={4}>{children}</Box>
      </main>
      <Footer />
    </>
  )
}
