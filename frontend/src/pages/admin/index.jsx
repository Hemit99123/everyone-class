import React from 'react'
import { Text, Box } from '@chakra-ui/react'
import CreateClassButton from './components/CreateClassButton'
import ClassPost from './components/ClassPost'

const Admin = () => {
  return (
    <Box padding={5}>
      <Text fontSize="4xl" fontWeight="bold" mb="0.3rem" marginRight={5}>
        Admin Portal
      </Text>
      <CreateClassButton />
      <ClassPost />
    </Box>
  )
}

export default Admin