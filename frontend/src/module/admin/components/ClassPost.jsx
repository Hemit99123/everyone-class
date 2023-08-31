import React, { useEffect, useState } from 'react';
import { getClass, deleteClass } from '../utils/classOperations';
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
  useDisclosure,
  useToast
} from '@chakra-ui/react';
import { 
  AddIcon, 
  DeleteIcon, 
  EditIcon,
  CopyIcon
} from '@chakra-ui/icons';
import { useAuth0 } from '@auth0/auth0-react';
import Loading from '../../../common/Loading';
import UpdateModal from './UpdateModal';
import CreateModal from './CreateModal';

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
  const toast = useToast()

  const copyText = (id) => {
    navigator.clipboard.writeText(`https://classroom.everyonestem.org/room/${id}`);
    toast({
      title: 'Copied link',
      description: "Now you can share this link with anyone in the world!",
      status: 'info',
      duration: 5000,
      isClosable: true,
    })
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
          <Button flex='1' variant='ghost' leftIcon={<CopyIcon />} onClick={() => {copyText(classItem._id)}}>
            Copy Link
          </Button>
          <Button flex='1' variant='ghost' leftIcon={<DeleteIcon />} onClick={() => {deleteClass(classItem._id, toast)}}>
            Delete
          </Button>
          <Button flex='1' variant='ghost' leftIcon={<EditIcon />} onClick={onOpenUpdateModal}>
            Update
          </Button>
        </CardFooter>
      </Card>
      <CreateModal 
        classID={classItem._id}
        isOpenCreateModal={isOpenCreateModal}
        onCloseCreateModal={onCloseCreateModal}
      />
      <UpdateModal 
        id={classItem._id}
        isOpenUpdateModal={isOpenUpdateModal} 
        onCloseUpdateModal={onCloseUpdateModal} 
        initialTitle={classItem.title} 
        initialDescription={classItem.description} 
        initialGenre={classItem.genre}
      />
    </>
  );
};

export default ClassPost