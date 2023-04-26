import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons'
import { Box, Collapse, Flex, HStack, Heading, IconButton, useColorModeValue, useDisclosure } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { ColorModeSwitcher } from './ColorModeSwitcher'
import { DesktopNav } from './DesktopNav'
import { MobileNav } from './MobileNav'

export const Navbar = () => {
  const { isOpen, onToggle } = useDisclosure()
  const [isDisabled, setDisabled] = useState<boolean>(false)
  const onNavigate = () => onToggle()
  const impulzusLogo = useColorModeValue('/img/long_logo_blue.png', '/img/long_logo_white.png')

  return (
    <Flex justifyContent="center" w="full" mr={5}>
      <Box mx="auto" w="full" color={useColorModeValue('brand.500', 'white')}>
        <Flex h="4rem" w="full" px={4} py={2} align="center" justifyContent="space-between">
          <Heading as={Link} href={'/'} _hover={{ textDecoration: 'none' }}>
            <Image alt="impulzus_logo" src={impulzusLogo} width={150} height={1} />
          </Heading>
          <Flex display={{ base: 'none', lg: 'flex' }} flex={1} justifyContent="center">
            <DesktopNav />
          </Flex>
          <Flex>
            <HStack ml={{ base: 0, md: 6 }}>
              <ColorModeSwitcher />
            </HStack>
            <IconButton
              isDisabled={isDisabled}
              display={{ base: 'flex', lg: 'none' }}
              onClick={() => {
                setDisabled(true)
                onToggle()
                setTimeout(() => setDisabled(false), 300)
              }}
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon boxSize="1.5rem" />}
              variant="ghost"
              aria-label="Open navigation"
            />
          </Flex>
        </Flex>

        <Collapse in={isOpen} animateOpacity>
          <MobileNav onNavigate={onNavigate} />
        </Collapse>
      </Box>
    </Flex>
  )
}
