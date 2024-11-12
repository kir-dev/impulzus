'use client'
import customTheme from '@/assets/theme'
import Layout from '@/components/layout'
import '@/styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import { NextPage } from 'next'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'
import { ReactElement, ReactNode } from 'react'

// eslint-disable-next-line @typescript-eslint/ban-types
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function RootLayout({ children, session }: { children: ReactNode; session?: any }) {
  return (
    <html>
      <body>
        <ThemeProvider attribute="class">
          <SessionProvider session={session}>
            <ChakraProvider theme={customTheme}>
              <Layout>{children}</Layout>
            </ChakraProvider>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
