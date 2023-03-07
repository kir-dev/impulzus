import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) { //navbar, footer, authcontext stb
  return <Component {...pageProps} />
}
