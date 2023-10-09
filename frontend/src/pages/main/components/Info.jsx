import { Box, Text, Button, IconButton, Stack } from '@chakra-ui/react';
import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

const Info = () => {
  const { user } = useAuth0();
  const [showUserSub, setShowUserSub] = useState(false);

  const toggleUserSub = () => {
    setShowUserSub(prevState => !prevState);
  };

  const getGreeting = () => {
    const currentTime = new Date();
    const hours = currentTime.getHours();

    if (hours >= 5 && hours < 12) {
      return 'Good morning';
    } else if (hours >= 12 && hours < 17) {
      return 'Good afternoon';
    } else {
      return 'Good evening';
    }
  };

  return (
    <Box p={6} boxShadow="md" borderRadius="lg" textAlign="center">
      <Text fontSize="2xl" fontWeight="bold" mb={2}>
        {getGreeting()}, {user.name}!
      </Text>
      <Stack direction="column" align="center">
        <Text fontSize="lg" fontWeight="semibold">
          User Sub: {showUserSub ? user.sub : '•••••••••••••••••••'}
        </Text>
        {showUserSub && (
          <Text fontSize="sm" color="gray.600" mt={2}>
            Keep your user sub confidential and don't share it with anyone.
          </Text>
        )}
      </Stack>
      <Button
        onClick={toggleUserSub}
        mt={6}
        leftIcon={showUserSub ? <ViewOffIcon /> : <ViewIcon />}
        colorScheme={showUserSub ? 'red' : 'green'}
        size="sm"
      >
        {showUserSub ? 'Hide User Sub' : 'Show User Sub'}
      </Button>
    </Box>
  );
};

export default Info;
