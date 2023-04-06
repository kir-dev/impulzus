import { Flex, HStack, Image, Stack, Text, VStack, useColorModeValue } from '@chakra-ui/react'
import { FaEnvelope, FaHeart } from 'react-icons/fa'

export const Footer = () => {
  const kirdevLogo = useColorModeValue('/img/kirdev.svg', '/img/kirdev-white.svg')

  return (
    <Stack align="center" direction={['column', 'row']} p={2} width="100%" justify="space-between" borderWidth={1} borderColor="red">
      <Flex>
        <Image alt="impulzus logo" src="/img/impulzus.png" width={100} height={100} />
        <HStack>
          <FaEnvelope />
          <Text>impulzus@impulzus.bme.hu</Text>
        </HStack>
      </Flex>
      <Flex align="center">
        <Image alt="kir-dev logo" src={kirdevLogo} width={100} height={100} />
        <VStack>
          <Text>Made with</Text>
          <FaHeart />
          <Text>by Kir-Dev</Text>
        </VStack>
      </Flex>
    </Stack>
  )
}
