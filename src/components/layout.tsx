import { PropsWithChildren } from 'react'
import { Footer } from './footer'
import { Navbar } from './navbar'

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Navbar />
      <main>
        <div>{children}</div>
      </main>
      <Footer />
    </>
  )
}
