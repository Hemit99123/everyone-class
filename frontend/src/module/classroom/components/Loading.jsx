import React from 'react';
import { Spinner, Container, Center, Text, HStack, Flex } from '@chakra-ui/react';

const Loading = () => {
  return (
    <Container maxW="100%" p={8} align='center'>
          <Spinner size="xl" />
          <Text ml={2} fontSize="2xl">
            Classroom is loading
          </Text>
    </Container>
  );
};

export default Loading;
