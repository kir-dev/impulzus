import customTheme from '@/assets/theme'
import Layout from '@/components/layout'
import '@/styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import { NextPage } from 'next'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'
import { ReactElement, ReactNode } from 'react'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps: { session, ...pageProps } }: AppPropsWithLayout) {
  //navbar, footer, authcontext stb
  const getLayout = Component.getLayout ?? ((page: any) => page)
  return getLayout(
    <ThemeProvider attribute="class">
      <SessionProvider session={session}>
        <ChakraProvider theme={customTheme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </SessionProvider>
    </ThemeProvider>
  )
}
