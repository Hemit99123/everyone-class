import React, {useState} from 'react'
import {
    Box,
    Text,
    Button,
    Badge,
    Link,
    IconButton,
    Flex,
    useToast
  } from '@chakra-ui/react';
  import {
    FaYoutube,
    FaGithub,
    FaCode,
    FaVideo,
    FaExternalLinkAlt,
  } from 'react-icons/fa';
import { useAuth0 } from '@auth0/auth0-react';
import { DeleteIcon } from '@chakra-ui/icons';
import { deletePost } from '../utils/postOperations';

const Post = ({id, title, message, zoom, githubName, githubURL, githubCloneURL, githubDescription, githubLanguage, youtubeID, realworldApplication, userSub}) => {
    const {user} = useAuth0()
    const [showYoutube, setShowYoutube] = useState({});
    const [showGithub, setShowGithub] = useState({});
    const toast = useToast()
  return (
    <Box borderRadius="md" boxShadow="md" p={4} mb={4}>
    <Text fontSize="lg" fontWeight="bold">
      {title}
    </Text>
    <Text fontSize="md" mt={2}>
      {message}
    </Text>
    {zoom && (
      <Box p={2} cursor="pointer">
        <Flex alignItems="center">
          <FaVideo style={{ marginRight: '8px' }} />
          <Text fontSize="md" fontWeight="semibold" display="inline">
            Zoom Link:
          </Text>
          <Box
            onClick={() => {
              window.location.href = zoom;
            }}
            ml={2}
          >
            <IconButton
              icon={<FaExternalLinkAlt />}
              size="xs"
              aria-label="External Link"
            />
          </Box>
        </Flex>
      </Box>
    )}
    {githubName && (
      <Box
        p={2}
        cursor="pointer"
        onClick={() =>
          setShowGithub((prevState) => ({
            ...prevState,
            [id]: !prevState[id],
          }))
        }
      >
        <Flex alignItems="center">
          <FaGithub style={{ marginRight: '8px' }} />
          <Text fontSize="md" fontWeight="semibold" display="inline">
            GitHub Repository:
          </Text>
          <Link href={githubURL} isExternal ml={2}>
            <IconButton
              icon={<FaExternalLinkAlt />}
              size="xs"
              aria-label="External Link"
            />
          </Link>
        </Flex>
        {showGithub[id] && (
          <Box>
            <Text fontWeight="semibold">
              Name: {githubName}
            </Text>
            <Badge mt={1} mb={2}>
              {githubLanguage}
            </Badge>
            <Text>{githubDescription}</Text>
            <Button
              mt={2}
              variant="outline"
              leftIcon={<FaCode />}
              onClick={() => {
                navigator.clipboard
                  .writeText(githubCloneURL)
                  .then(() => {
                    toast({
                      title: 'Copied clone url',
                      description: "Now, you can use this clone url with Git to clone this repo :)",
                      status: 'success',
                      duration: 5500,
                      isClosable: true,
                    })
                  })
                  .catch((error) => {
                    console.error(
                      'Error copying clone URL:',
                      error
                    );
                  });
              }}
            >
              Clone
            </Button>
          </Box>
        )}
      </Box>
    )}
    {youtubeID && (
      <Box
        p={2}
        display="flex"
        alignItems="center"
        cursor="pointer"
        onClick={() =>
          setShowYoutube((prevState) => ({
            ...prevState,
            [id]: !prevState[id],
          }))
        }
      >
        <FaYoutube
          style={{ marginRight: '8px', fontSize: '25px' }}
        />
        <Text fontSize="md" fontWeight="bold">
          YouTube
        </Text>
        {showYoutube[id] && (
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${youtubeID}?si=k_0AbfAaSAFAOrZV`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        )}
      </Box>
    )}
    {realworldApplication && (
      <Box p={2}>
        <Text fontSize="md" fontWeight="semibold">
          Real World Application
        </Text>
        <Text fontSize="md">{realworldApplication}</Text>
      </Box>
    )}
    {userSub === user.sub && (
      <Button onClick={() => deletePost(id)}>
        <DeleteIcon />
      </Button>
    )}
  </Box>
  )
}

export default Post