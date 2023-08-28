import React from 'react';
import { Text, Box, Flex, useColorModeValue } from '@chakra-ui/react';
import { InfoOutlineIcon } from '@chakra-ui/icons';

const Information = () => {
  const textColor = useColorModeValue('gray.600', 'gray.300'); // Adjust shades for light and dark mode

  return (
    <Box p={8}>
      <Flex alignItems="center" mb={4}>
        <InfoOutlineIcon boxSize={6} mr={2} />
        <Text fontSize="xl" fontWeight="semibold">
           Classroom Information
        </Text>
      </Flex>
      <Text fontSize="md" color={textColor}>
        Welcome to the classroom! Instructors post on the feed, and you can view posts from them :)
      </Text>
    </Box>
  );
};

export default Information;