import React, { useState, useEffect } from 'react';
import { Text, Input, Button, Box, Grid, GridItem, Badge, Stack } from '@chakra-ui/react'; 
import { DeleteIcon, ExternalLinkIcon, AddIcon } from '@chakra-ui/icons';
import Info from './components/Info';
import { getClass } from './utils/getClass';

const Main = () => {
  const [id, setID] = useState('');
  const [savedClasses, setSavedClasses] = useState([]);
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    const savedClassesFromLocalStorage = JSON.parse(localStorage.getItem('savedClasses')) || [];
    setSavedClasses(savedClassesFromLocalStorage);
  }, []);

  const saveClassroom = async () => {
    try {
      const response = await getClass(id);

      if (response && response._id && response.title) {
        const newClass = {
          title: response.title,
          genre: response.genre,
          link: `https://classroom.everyonestem.org/room/${response._id}`
        };

        const updatedClasses = [...savedClasses, newClass];
        setSavedClasses(updatedClasses);

        localStorage.setItem('savedClasses', JSON.stringify(updatedClasses));
        console.log('Classroom saved successfully.');
      } else {
        console.error('Failed to save classroom. Response data is incomplete.');
      }
    } catch (error) {
      console.error('Error saving classroom:', error);
    }
  };

  const removeClass = (index) => {
    const updatedClasses = [...savedClasses];
    updatedClasses.splice(index, 1);
    setSavedClasses(updatedClasses);
    localStorage.setItem('savedClasses', JSON.stringify(updatedClasses));
  }

  const toggleForm = () => {
    setShowForm(prevState => !prevState)
  }

  return (
    <>
      <Info />
      <Box p={4}>
        
        <Stack
          spacing={2}
          direction={['column', 'column', 'row']}
          justifyContent={['flex-start', 'flex-start', 'flex-end']}
          mb={3}
        >
          <Button onClick={toggleForm} size='lg'>
            <AddIcon />
          </Button>
        </Stack>

        {showForm && 
        <>
          <Input onChange={(e) => {setID(e.target.value)}} placeholder='Enter Class ID' mb={4} mt={2}/>
          <Button onClick={saveClassroom} colorScheme="teal" mb={4} display={['block', 'block']}>
            Save
          </Button>
        </>
        }

        <Text fontSize='3xl' fontWeight='bold' mb={4}>Saved Classes</Text>

        {savedClasses.length > 0 && (
          <Grid
            templateColumns={['1fr', '1fr', 'repeat(3, 1fr)']}
            gap={4}
          >
            {savedClasses.map((classObj, index) => (
              <GridItem key={index}>
                <Box borderWidth={1} borderRadius="md" p={4}>
                  <Text fontSize="lg">
                    {classObj.title}
                  </Text>
                  <Text >
                    Genre: <Badge backgroundColor='cadetblue' color='white'>{classObj.genre}</Badge>
                  </Text>
                  <br />
                  <Stack
                    spacing={2}
                    direction={['column', 'column', 'row']}
                    justifyContent={['flex-start', 'flex-start', 'flex-end']}
                  >
                    <Button onClick={() => {window.location.href = classObj.link}} size="sm">
                      <ExternalLinkIcon />
                    </Button>
                    <Button onClick={() => removeClass(index)} size="sm" ml={1}>
                      <DeleteIcon />
                    </Button>
                  </Stack>
                </Box>
              </GridItem>
            ))}
          </Grid>
        )}

        {savedClasses.length === 0 && (
          <Text>No saved classes yet.</Text>
        )}
      </Box>
    </>
  );
};

export default Main;