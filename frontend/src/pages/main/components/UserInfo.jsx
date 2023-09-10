import { Box, Text, Button } from '@chakra-ui/react';
import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

const UserInfoComponent = () => {
  const { user } = useAuth0();
  const [showUserSub, setShowUserSub] = useState(false);

  const toggleUserSub = () => {
    setShowUserSub(!showUserSub);
  };

  return (
    <Box
      p={4}
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="md"
      textAlign="center"
    >
      <Text mt={2} fontSize="lg" fontWeight="semibold">
        Name: {user.name}
      </Text>
      <Text mt={2} fontSize="lg" fontWeight="semibold">
        Email: {user.email}
      </Text>
      <Text mt={4} fontSize="lg" fontWeight="semibold">
        User Sub: {showUserSub ? user.sub : '•••••••••••••••••••'}
      </Text>
      {showUserSub && (
        <Text mt={4} fontSize="sm" color="gray.500">
          Keep your user sub confidential and don't share it with anyone.
        </Text>
      )}
      <Button
        onClick={toggleUserSub}
        mt={6}
        leftIcon={showUserSub ? <ViewOffIcon /> : <ViewIcon />}
        colorScheme={showUserSub ? 'red' : 'green'}
        size="sm"
      >
        {showUserSub ? 'Hide' : 'Show'}
      </Button>
    </Box>
  );
};

export default UserInfoComponent;