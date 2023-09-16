import React, { useRef } from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  ModalBody,
  Select,
  useDisclosure,  
  Textarea,
  useToast
} from '@chakra-ui/react';
import {AddIcon} from '@chakra-ui/icons'
import { createClass } from '../utils/classOperations';
import resetForm from '../utils/resetForm';
import { useAuth0 } from '@auth0/auth0-react';

const CreateClassButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const titleRef = useRef()
  const genreRef = useRef()
  const descriptionRef = useRef()
  const refs = [titleRef, genreRef, descriptionRef]
  const toast = useToast()

  const {user} = useAuth0()

  const createClassOperation = () => {
    createClass(titleRef.current.value, genreRef.current.value, user.name, descriptionRef.current.value, user.sub, toast)
    resetForm(refs)
  }

  return (
    <>
      <Button
        size="lg"
        position="absolute"
        top="128px"
        right="20px"
        onClick={onOpen}
      >
        <AddIcon />
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a new classroom</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input placeholder='Title' ref={titleRef}/>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Textarea placeholder='Description' ref={descriptionRef}/>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Genre</FormLabel>
              <Select placeholder="Select genre" ref={genreRef}>
                <option value="business">Business</option>
                <option value="computer">Computer Science</option>
                <option value="math">Math</option>
                <option value="science">Science</option>
                <option value="engineering">Engineering</option>
                <option value="psychology">Psychology</option>
              </Select>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button 
              colorScheme='blue' 
              onClick={createClassOperation} 
              marginRight={3}
            >
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateClassButton;