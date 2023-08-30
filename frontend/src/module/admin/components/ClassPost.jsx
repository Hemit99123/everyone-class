import React, { useEffect, useState, useRef } from 'react';
import { getClass, updateClass, deleteClass } from '../utils/classOperations';
import { createPost } from '../utils/postOperations';
import getGithubRepo from '../utils/getGithubRepo';
import resetForm from '../utils/resetForm';
import youtube from '../utils/youtube'
import {
  Box,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Flex,
  Heading,
  Text,
  Badge,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Select,
  Textarea,
  Center,
  useDisclosure
} from '@chakra-ui/react';
import { 
  AddIcon, 
  DeleteIcon, 
  EditIcon,
  CopyIcon
} from '@chakra-ui/icons';
import { FaSync } from 'react-icons/fa';
import { useAuth0 } from '@auth0/auth0-react';
import OpenForm from './OpenForm';
import Loading from '../../../common/Loading';

const ClassPost = () => {
  const [classData, setClassData] = useState([]);
  const [loading, setLoading] = useState(true)
  const {user} = useAuth0()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getClass(user.sub);
        setClassData(response);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // Regardless of success or error, set loading to false
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {classData.map((classItem, index) => (
        <AdminClassCard key={index} classItem={classItem} classData={classData} />
      ))}
    </>
  );
};

const AdminClassCard = ({ classItem }) => {
  const {isOpen: isOpenUpdateModal, onOpen: onOpenUpdateModal, onClose: onCloseUpdateModal} = useDisclosure()
  const {isOpen: isOpenCreateModal, onOpen: onOpenCreateModal, onClose: onCloseCreateModal} = useDisclosure()

  // update fields
  const [title, setTitle] = useState(classItem.title)
  const [description, setDescription] = useState(classItem.description)
  const [genre, setGenre] = useState(classItem.genre)

  // post fields

  const titleRef = useRef()
  const messageRef = useRef()
  const zoomRef = useRef()
  const realworldRef = useRef()
  const ownerRef = useRef()
  const repoRef = useRef()
  const youtubeLinkRef = useRef()
  const [githubRepo, setGithubRepo] = useState()
  const [githubForm, setGithubForm] = useState(false)
  const [youtubeID, setYoutubeID] =  useState()
  const [youtubeForm, setYoutubeForm] = useState(false)
  const refs = [titleRef, messageRef, zoomRef, realworldRef, ownerRef, repoRef, youtubeID]

  const fetchGithubData = async () => {
    try {
      const response = await getGithubRepo(ownerRef.current.value, repoRef.current.value);
      setGithubRepo(response)
    } catch (error) {
      console.error(error);
    }
  };

  const handleGetVideoId = () => {
    const extractedVideoId = youtube(youtubeLinkRef.current.value);

    if (extractedVideoId) {
      setYoutubeID(extractedVideoId);
    } else {
      alert('Invalid video link');
    }
  };


  const createPostOperation = () => {
    const realWorldApplication = realworldRef?.current?.value?.trim();
    const zoomValue = zoomRef?.current?.value?.trim();
    const githubURL = githubRepo?.html_url;
    const githubName = githubRepo?.full_name;
    const githubLanguage = githubRepo?.language;
    const githubCloneURL = githubRepo?.clone_url;
  
    createPost(
      classItem._id,
      titleRef.current?.value,
      messageRef.current?.value,
      zoomValue !== "" ? zoomValue : undefined,
      realWorldApplication !== "" ? realWorldApplication : undefined,
      githubURL !== "" ? githubURL : undefined,
      githubName !== "" ? githubName : undefined,
      githubLanguage !== "" ? githubLanguage : undefined,
      githubCloneURL !== "" ? githubCloneURL : undefined, 
      youtubeID !== "" ? youtubeID : undefined 
    );
  
    resetForm(refs);
    setGithubRepo();
  };
  
  
  
  
  
  
  

  const toggleGithubForm = () => {
    setGithubForm(prevState => !prevState)
  }

  const toggleYoutubeForm = () => {
    setYoutubeForm(prevState => !prevState)
  }

  return (
    <>
      <Card maxW='100%' marginBottom={4}>
        <CardHeader>
          <Flex spacing='4'>
            <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
              <Box>
                <Heading size='sm'>{classItem.title}</Heading>
                <Text>{classItem.instructor}</Text>
                <Badge borderRadius='full' px='2' colorScheme='teal'>
                  {classItem.genre}
                </Badge>
              </Box>
            </Flex>
          </Flex>
        </CardHeader>
        <CardBody>
          <Text>{classItem.description}</Text>
        </CardBody>

        <CardFooter
          justify='space-between'
          flexWrap='wrap'
          sx={{
            '& > button': {
              minW: '136px',
            },
          }}
        >
          <Button flex='1' variant='ghost' leftIcon={<AddIcon />} onClick={onOpenCreateModal}>
            Create
          </Button>
          <Button flex='1' variant='ghost' leftIcon={<CopyIcon />} onClick={() => {navigator.clipboard.writeText(`https://classroom.everyonestem.org/classroom/${classItem._id}`);}}>
            Copy Link
          </Button>
          <Button flex='1' variant='ghost' leftIcon={<DeleteIcon />} onClick={() => {deleteClass(classItem._id)}}>
            Delete
          </Button>
          <Button flex='1' variant='ghost' leftIcon={<EditIcon />} onClick={onOpenUpdateModal}>
            Update
          </Button>
        </CardFooter>
      </Card>
      <Modal isOpen={isOpenUpdateModal} onClose={onCloseUpdateModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update the classroom</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input value={title} onChange={(e) => {setTitle(e.target.value)}}  />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Textarea value={description} onChange={(e) => {setDescription(e.target.value)}}/>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Genre</FormLabel>
              <Select value={genre} onChange={(e) => { console.log(e.target.value); setGenre(e.target.value) }}>
                <option value="business">Business</option>
                <option value="computer">Computer</option>
                <option value="math">Math</option>
                <option value="science">Science</option>
              </Select>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' onClick={() => {updateClass(classItem._id, title, description, genre)}} marginRight={2}>
              Save changes
            </Button>
            <Button onClick={onCloseUpdateModal}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={isOpenCreateModal} onClose={onCloseCreateModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a post</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Post title</FormLabel>
              <Input ref={titleRef}  />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Message</FormLabel>
              <Textarea ref={messageRef} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Zoom link</FormLabel>
              <Input ref={zoomRef} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Real World Application</FormLabel>
              <Textarea ref={realworldRef} />
            </FormControl>

            <OpenForm 
              item='Github'
              form={githubForm}
              toggleform={toggleGithubForm}
            />

            {githubForm &&
              <>
                <FormControl>
                  <FormLabel>Owner</FormLabel>
                  <Input ref={ownerRef} />
                </FormControl>
                <FormControl>
                  <FormLabel>Repo Name</FormLabel>
                  <Input ref={repoRef} />
                </FormControl>
                <Text mt={2} fontSize="sm" color="gray.600">
                  Press this button so all the data needed is saved :)
                </Text>
                <Center mt={4}>
                  <Button onClick={fetchGithubData} leftIcon={<FaSync />}>
                    Fetch data
                  </Button>
                </Center>
              </>
            }
            <OpenForm 
            item="Youtube"
            form={youtubeForm}
            toggleform={toggleYoutubeForm}
            />
            {youtubeForm &&
            <>
              <FormControl>
                  <FormLabel>Youtube Video Link</FormLabel>
                <Input ref={youtubeLinkRef} />
              </FormControl>
              <Text mt={2} fontSize="sm" color="gray.600">
                Press this button so all the data needed is saved :)
              </Text>
              <Center>
                <Button  onClick={handleGetVideoId}>
                  Get Youtube 
                </Button>
              </Center>
            </>
            }
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' onClick={createPostOperation}>
                Post
            </Button>
            <Button onClick={onCloseCreateModal}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ClassPost