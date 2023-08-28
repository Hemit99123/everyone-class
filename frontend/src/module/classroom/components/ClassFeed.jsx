import React, { useEffect, useState } from 'react';
import {
  Box,
  Text,
  Badge,
  Container,
  VStack,
  Center,
} from '@chakra-ui/react';
import { getOneClass } from '../utils/getOneClass';
import { getPost } from '../utils/postOperations'; // Update the path to the correct getPost file
import { useParams } from 'react-router-dom';
import Post from './Post';
import NotFound from './NotFound';

const ClassFeed = () => {
  const { id } = useParams();
  const [post, setPost] = useState([]);
  const [classroom, setClassroom] = useState();

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await getPost(id);
        setPost(response);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchClassData = async () => {
      try {
        const response = await getOneClass(id);
        setClassroom(response);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPostData();
    fetchClassData();
  }, []);

  if(!classroom) {
    return (
      <NotFound />
    )
  }

  return (
    <div>
      <Container maxW="100%" p={8}>
        <VStack align="stretch" spacing={6}>
          <Box py={4} px={6} rounded="md" shadow="lg">
            <Center>
              <Text fontWeight="bold" fontSize="2xl" mb={2}>
                {classroom?.title}
              </Text>
            </Center>
            <Badge bgColor={'teal'} color={'white'}>
              {classroom?.genre}
            </Badge>
            <Text fontSize="lg" fontWeight="medium" mb={2}>
              Instructor: {classroom?.instructor}
            </Text>
            <Text fontSize="md" mb={4}>
              {classroom?.description}
            </Text>
          </Box>
        </VStack>
      </Container>
      <Box ml={9}>
        <Text fontSize="4xl" fontWeight="bold" mb={4}>
          Feed
        </Text>
        {post.map((item) => (
          <Post
            key={item._id} 
            id={item._id}
            title={item.title}
            message={item.message}
            zoom={item.zoom}
            githubName={item.githubName}
            githubURL={item.githubURL}
            githubCloneURL={item.githubCloneURL}
            githubDescription={item.githubDescription}
            githubLanguage={item.githubLanguage}
            youtubeID={item.youtubeID}
            realworldApplication={item.realworldApplication}
            userSub={classroom?.userSub}
          />
        ))}
      </Box>
    </div>
  );
};

export default ClassFeed;
