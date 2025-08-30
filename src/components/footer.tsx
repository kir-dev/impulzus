'use client'
import { Flex, HStack, Image, Link, Stack, Text, VStack, useColorModeValue } from '@chakra-ui/react'
import { useTranslations } from 'next-intl'
import NextLink from 'next/link'
import { FaEnvelope, FaFacebook, FaGithub, FaGlobe, FaHeart, FaInfoCircle, FaInstagram } from 'react-icons/fa'

export const Footer = () => {
  const t = useTranslations()
  const kirdevLogo = useColorModeValue('/img/kirdev.svg', '/img/kirdev-white.svg')
  const impulzusLogo = useColorModeValue('/img/impulzus_logo_light.png', '/img/impulzus_logo_dark.png')

  return (
    <Stack align="center" direction={['column', 'row']} p={2} width="100%" justify="space-between">
      <Flex align="center">
        <NextLink href="/">
          <Image alt="impulzus logo" src={impulzusLogo} width={100} height={100} />
        </NextLink>
        <VStack ml={3}>
          <Text>{t('contacts')}</Text>
          <HStack alignItems="center">
            <Link isExternal href="mailto:impulzus@impulzus.bme.hu">
              <FaEnvelope />
            </Link>
            <Link isExternal href="https://www.facebook.com/impulzus">
              <FaFacebook />
            </Link>
            <Link isExternal href="https://www.instagram.com/impulzus_vik">
              <FaInstagram />
            </Link>
            <Link href="/impressum">
              <FaInfoCircle />
            </Link>
          </HStack>
        </VStack>
      </Flex>
      <Flex align="center">
        <VStack>
          <HStack>
            <Text>Made with</Text>
            <FaHeart />
            <Text>by</Text>
          </HStack>
          <HStack>
            <Link isExternal href="https://github.com/kir-dev">
              <FaGithub />
            </Link>
            <Link isExternal href="https://kir-dev.hu">
              <FaGlobe />
            </Link>
            <Link isExternal href="https://www.facebook.com/kirdevteam">
              <FaFacebook />
            </Link>
            <Link isExternal href="https://www.instagram.com/kir.dev/">
              <FaInstagram />
            </Link>
          </HStack>
          <Text textAlign="center">&copy; {new Date().getFullYear()}</Text>
        </VStack>
        <Link isExternal href="https://kir-dev.hu">
          <Image alt="kir-dev logo" src={kirdevLogo} width={100} height={100} />
        </Link>
      </Flex>
    </Stack>
  )
}
