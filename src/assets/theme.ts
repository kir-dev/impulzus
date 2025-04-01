'use client'
import { StyleFunctionProps, extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const customTheme = extendTheme({
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        color: mode('black', 'whiteAlpha.900')(props),
        bg: mode('white', 'brand.900')(props)
      }
    })
  },
  colors: {
    kirDev: '#f15a29'
  },

  breakpoints: {
    // sm-2xl are the chakra defaults, added an extra breakpoint for 16+ inch full HD screens
    sm: '30em',
    m: '39em',
    md: '48em',
    lg: '62em',
    xl: '80em',
    '2xl': '96em',
    '3xl': '112em'
  }
})

export default customTheme
