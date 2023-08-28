import React from 'react';
import { Text, Heading, Box, Button, Link } from '@chakra-ui/react';

const Main = () => {
  return (
    <Box p={10}  minHeight="100vh" display="flex" alignItems="center" justifyContent="center">
      <Box maxWidth="600px" p={8} borderRadius="lg" boxShadow="lg">
        <Heading as="h1" size="xl" mb={4}>
          This is Everyone Class...
        </Heading>
        <Text fontSize="lg">
          Our tool empowers instructors to easily create and manage STEM (Science, Technology,
          Engineering, and Mathematics) classrooms, providing an interactive and engaging learning
          environment for students.
        </Text>
        <Text fontSize="lg" mt={6}>
          With the STEM Classroom Creator, you can:
        </Text>
        <ul style={{ paddingLeft: '20px', marginTop: '8px' }}>
          <li>
            <Text fontSize="lg">Design custom lessons and assignments.</Text>
          </li>
          <li>
            <Text fontSize="lg">Integrate multimedia content to enhance learning.</Text>
          </li>
          <li>
            <Text fontSize="lg">Track student progress and performance.</Text>
          </li>
          <li>
            <Text fontSize="lg">Facilitate collaborative projects and discussions.</Text>
          </li>
        </ul>
        <Text fontSize="lg" mt={6}>
          Whether you're an educator in a traditional classroom or a remote learning environment,
          our tool makes it simple to create an engaging STEM experience for your students.
        </Text>
        <Text fontSize="lg" mt={6}>
          To get started, create a classroom by visiting the{' '}
          <Link href="/admin" color="blue.500">
            admin page
          </Link>
          .
        </Text>
        <Text fontSize="lg" mt={6}>
          We also offer seamless integration with popular platforms:
        </Text>
        <ul style={{ paddingLeft: '20px', marginTop: '8px' }}>
          <li>
            <Text fontSize="lg">
              Integrate your repos from your GitHub repositories to provide coding examples and
              exercises.
            </Text>
          </li>
          <li>
            <Text fontSize="lg">
              Embed educational videos from YouTube to enrich your lessons.
            </Text>
          </li>
          <li>
            <Text fontSize="lg">
              Conduct live virtual classes using Zoom for real-time interactions.
            </Text>
          </li>
        </ul>
        <Button
          as="a"
          href="/admin"
          colorScheme="blue"
          size="lg"
          mt={8}
          _hover={{ textDecoration: 'none' }}
          width="100%"
        >
          Create Your STEM Classroom
        </Button>
      </Box>
    </Box>
  );
};

export default Main;
