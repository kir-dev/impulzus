import { Text } from '@chakra-ui/react'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const Paragraph = ({ children }: Props) => {
  return (
    <Text mt={2} textAlign="justify">
      {children}
    </Text>
  )
}
