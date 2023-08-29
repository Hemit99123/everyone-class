import React from 'react';
import { Spinner, Container, Text } from '@chakra-ui/react';

const Loading = () => {
  return (
    <Container maxW="lg" p={8} textAlign="center">
      <Spinner size="xl" color="blue.500" />
      <Text mt={4} fontSize="xl" fontWeight="bold">
        Loading...
      </Text>
      <Text mt={2}>
        If it is taking a while, please be patient, as this might happen when our server has been inactive for some time
      </Text>
      <Text mt={2} fontStyle="italic">
        We appreciate your patience at Everyone STEM :)
      </Text>
    </Container>
  );
};

export default Loading;
