import { Button, Flex, Heading, Text, useColorMode } from '@chakra-ui/react';
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

const AuthForm = () => {
  const { loginWithRedirect } = useAuth0();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      minHeight="85vh"
      padding={8}
    >
      <Button
        onClick={toggleColorMode}
        position="absolute"
        top={4}   // Adjust the top spacing as needed
        right={4} // Adjust the right spacing as needed
      >
        {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
      </Button>
      <Heading mb={4} size="xl">
        Welcome to Everyone Class
      </Heading>
      <Text mb={6} textAlign="center">
        Log in to access/create high quality STEM education
      </Text>
      <Button
        onClick={loginWithRedirect}
        colorScheme="teal"
        size="lg"
        fontWeight="bold"
        _hover={{ opacity: 0.8 }}
        _focus={{ outline: 'none' }}
        boxShadow="md" // Add a subtle box shadow
      >
        Log in
      </Button>
    </Flex>
  );
};

export default AuthForm;
