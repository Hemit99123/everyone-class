import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Link,
} from '@chakra-ui/react'
import { HamburgerIcon, MoonIcon, SunIcon } from '@chakra-ui/icons'
import LogoBlack from './assets/logoblack.png'
import LogoWhite from './assets/logowhite.png'
import { FaSignOutAlt } from 'react-icons/fa';
import {useAuth0} from '@auth0/auth0-react'
import { useMediaQuery } from '@chakra-ui/react'

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode()
  const [isLargerThan500] = useMediaQuery('(max-width: 500px)')
  const { logout, user } = useAuth0()

  const goToHomePage = () => {
    window.location.href = "/"
  }

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4} padding={5}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Box onClick={goToHomePage} cursor="pointer">
            {colorMode === 'light' ? <img src={LogoBlack}/>:<img src={LogoWhite}/>}
          </Box>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              {!isLargerThan500 ? (
              <>
                <Link href='/admin' alignSelf={'center'}>Admin</Link>
                <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                </Button>             
              </>
              ) : (
                <>
                  <Menu>
                      <MenuButton>
                      <HamburgerIcon />
                      </MenuButton>
                    <MenuList>
                      <MenuItem onClick={() => {window.location.href = "/admin"}}>Admin</MenuItem>
                      <Center>
                      <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                </Button>  
                      </Center>  
                    </MenuList>
                  </Menu>
                </>
              )
              }
              <>
                <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}>
                  <Avatar
                    size={'sm'}
                    src={user?.picture}
                  />
                </MenuButton>
                <MenuList alignItems={'center'}>
                  <br />
                  <Center>
                    <Avatar
                      size={'xl'}
                      src={user?.picture}
                    
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>{user.name}</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem onClick={() => logout({ logoutParams: { returnTo: 'https://classroom.everyonestem.org' } })}>
                    Logout 
                  </MenuItem>
                </MenuList>
              </Menu>
              </>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  )
}