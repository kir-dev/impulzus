'use client'
import customTheme from '@/assets/theme'
import Layout from '@/components/layout'
import '@/styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'
import { ReactNode } from 'react'

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <ChakraProvider theme={customTheme}>
        <ThemeProvider>
          <Layout>{children}</Layout>
        </ThemeProvider>
      </ChakraProvider>
    </SessionProvider>
  )
}
