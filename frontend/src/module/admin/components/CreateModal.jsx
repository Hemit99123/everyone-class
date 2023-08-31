import React, {useRef, useState} from 'react'
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
    Center,
    Textarea,
    Button, 
    Text,
    useToast
} from '@chakra-ui/react'
import OpenForm from './OpenForm';
import { FaSync } from 'react-icons/fa';
import {createPost} from '../utils/postOperations'
import { youtube, getGithubRepo, getSketchfab } from '../utils/addons';
import resetForm from '../utils/resetForm'
const CreateModal = ({classID, isOpenCreateModal, onCloseCreateModal}) => {

  const toast = useToast()

      // post fields

  const titleRef = useRef()
  const messageRef = useRef()
  const zoomRef = useRef()
  const realworldRef = useRef()
  const ownerRef = useRef()
  const repoRef = useRef()
  const sketchfaburl = useRef()
  const youtubeLinkRef = useRef()
  const [githubRepo, setGithubRepo] = useState()
  const [githubForm, setGithubForm] = useState(false)
  const [youtubeID, setYoutubeID] =  useState()
  const [youtubeForm, setYoutubeForm] = useState(false)
  const [sketchfab, setSketchFab] = useState()
  const [sketchfabForm, setSketchFabForm] = useState()
  const refs = [titleRef, messageRef, zoomRef, realworldRef, ownerRef, repoRef, youtubeID, sketchfaburl]



  const createPostOperation = () => {
    const realWorldApplication = realworldRef?.current?.value?.trim();
    const zoomValue = zoomRef?.current?.value?.trim();
    const githubURL = githubRepo?.html_url;
    const githubName = githubRepo?.full_name;
    const githubLanguage = githubRepo?.language;
    const githubCloneURL = githubRepo?.clone_url;
    const sketchFabHTML = sketchfab?.html;
    const sketchFabTitle = sketchfab?.title;
   
    createPost(
      classID,
      titleRef.current?.value,
      messageRef.current?.value,
      zoomValue !== "" ? zoomValue : undefined,
      realWorldApplication !== "" ? realWorldApplication : undefined,
      githubURL !== "" ? githubURL : undefined,
      githubName !== "" ? githubName : undefined,
      githubLanguage !== "" ? githubLanguage : undefined,
      githubCloneURL !== "" ? githubCloneURL : undefined, 
      youtubeID !== "" ? youtubeID : undefined,
      sketchFabHTML !== "" ? sketchFabHTML: undefined,
      sketchFabTitle !== "" ? sketchFabTitle: undefined,
      toast
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

  const toggleSketchFabForm = () => {
    setSketchFabForm(prevState => !prevState)
  }
 

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

    const getModel = async () => {
      try {
        const response = await getSketchfab(sketchfaburl.current.value)
        setSketchFab(response)
      } catch(error) {
        console.error(error)
      }
    }

  return (
    <div>
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
            <OpenForm 
              item="SketchFab"
              form={sketchfabForm}
              toggleform={toggleSketchFabForm}
            />
            {sketchfabForm &&
                        <>
                        <FormControl>
                            <FormLabel>SketchFab URL (for 3D modeling)</FormLabel>
                          <Input ref={sketchfaburl} />
                        </FormControl>
                        <Center>
                          <Button  onClick={getModel}>
                            Fetch Model
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

    </div>
  )
}

export default CreateModal