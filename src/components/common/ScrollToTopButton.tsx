'use client'
import { Button } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { FaArrowUp } from 'react-icons/fa'

export const ScrollToTopButton = () => {
  const [scrollPosition, setScrollPosition] = useState(0)
  const handleScroll = () => {
    const position = window.scrollY
    setTimeout(() => setScrollPosition(position), 300)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <Button
      hidden={scrollPosition < 150}
      onClick={() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
      }}
      position="fixed"
      bottom={40}
      right={8}
      colorScheme="blue"
    >
      <FaArrowUp />
    </Button>
  )
}
