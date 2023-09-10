import React from 'react';
import { Box, Text, useColorMode } from '@chakra-ui/react';

import notFoundImageBlack from '../assets/notfoundblack.png';
import notFoundImageWhite from '../assets/notfoundwhite.png';

const NotFound = () => {
  const { colorMode } = useColorMode();
  const imageSrc = colorMode === 'light' ? notFoundImageBlack : notFoundImageWhite;
  
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <img src={imageSrc} alt="Not Found" style={{ maxWidth: '70%', height: 'auto' }} />
      <Text 
        fontSize="3xl" 
        fontWeight="semibold" 
        mt={6}
    >
        Oops! Classroom not found.
      </Text>
    </Box>
  );
};

export default NotFound;