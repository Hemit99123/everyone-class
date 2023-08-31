import React, { Fragment, useState } from 'react'
import {
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
    Button
} from '@chakra-ui/react'
import {updateClass} from '../utils/classOperations'

const UpdateModal = ({id, isOpenUpdateModal, onCloseUpdateModal, initialTitle, initialDescription, initialGenre }) => {

    const [title, setTitle] = useState(initialTitle)
    const [description, setDescription] = useState(initialDescription)
    const [genre, setGenre] = useState(initialGenre)
  return (
    <>
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
              <Select value={genre} onChange={(e) => {setGenre(e.target.value) }}>
                <option value="business">Business</option>
                <option value="computer">Computer</option>
                <option value="math">Math</option>
                <option value="science">Science</option>
              </Select>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' onClick={() => {updateClass(id, title, description, genre)}} marginRight={2}>
              Save changes
            </Button>
            <Button onClick={onCloseUpdateModal}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

    </>
  )
}

export default UpdateModal