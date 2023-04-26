import { Box, VStack } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'
import { Footer } from './footer'
import { Navbar } from './navbar/navbar'

export default function Layout({ children }: PropsWithChildren) {
  return (
    <VStack height="100%" minHeight="100vh" justify="space-between">
      <Box width="100%">
        <Navbar />
        <main>
          <Box p={4} mx={{ base: '0.2rem', m: '5rem', xl: '10rem' }}>
            {children}
          </Box>
        </main>
      </Box>
      <Footer />
    </VStack>
  )
}
