import { Divider, Heading, useColorModeValue } from '@chakra-ui/react'

type Props = {
  text: string
}

export const PageHeading = ({ text }: Props) => {
  const dividerColor = useColorModeValue('black', 'white')

  return (
    <>
      <Heading>{text}</Heading>
      <Divider my={3} borderWidth={2} borderColor={dividerColor} />
    </>
  )
}
