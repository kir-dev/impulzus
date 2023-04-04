import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons'
import { Box, Collapse, Flex, HStack, Heading, IconButton, useColorModeValue, useDisclosure } from '@chakra-ui/react'
import Link from 'next/link'
import { useState } from 'react'
import { ColorModeSwitcher } from './ColorModeSwitcher'
import { DesktopNav } from './DesktopNav'
import { MobileNav } from './MobileNav'

export const Navbar = () => {
  const { isOpen, onToggle } = useDisclosure()
  const [isDisabled, setDisabled] = useState<boolean>(false)
  const onNavigate = () => onToggle()

  return (
    <Flex justifyContent="center" w="full" mr={5}>
      <Box mx="auto" maxW="6xl" w="full" color={useColorModeValue('brand.500', 'white')}>
        <Flex h="4rem" w="full" px={4} py={2} align="center" justifyContent="space-between">
          <Heading as={Link} href={'/'} _hover={{ textDecoration: 'none' }}>
            Impulzus
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

  /*return (
    <nav className="w-full bg-white dark:bg-sky-900 shadow">
      <div className="flex justify-between">
        <div className="justify-between px-4 lg:max-w-7xl md:items-center md:flex md:px-8">
          <div className="flex md:flex-row items-center justify-between py-3 md:py-5 md:block">
            <div className="md:hidden">
              <button
                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? <FaTimes /> : <FaBars />}
              </button>
            </div>
            <Link href="/" onClick={() => setNavbar(false)}>
              <h2 className="text-2xl font-bold">impulzus</h2>
            </Link>
          </div>
          <div>
            <div className={`flex-1 justify-self-center pb-3 mt-1 md:block md:pb-0 md:mt-0 ${navbar ? 'flex' : 'hidden'}`}>
              <ul className="flex flex-col md:flex-row space-y-2 md:space-x-6 md:space-y-0 items-center">
                {MENU_LIST.map((menu) => (
                  <NavItem key={menu.text + menu.href} {...menu} onClick={() => setNavbar(false)} />
                ))}
              </ul>
            </div>
          </div>
        </div>
        <DarkModeToggleButton />
      </div>
    </nav>
  )*/
}
