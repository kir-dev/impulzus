'use client'
import { Divider, Heading, useColorModeValue } from '@chakra-ui/react'

type Props = {
  text: string
}

export const PageHeading = ({ text }: Props) => {
  const dividerColor = useColorModeValue('black', 'white')

  return (
    <>
      <Heading color="#2fa2cd">{text}</Heading>
      <Divider mt={3} mb={5} borderWidth={2} borderColor={dividerColor} />
    </>
  )
}
