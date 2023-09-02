import {api, message} from '../../config'

export const createClass = async (title, genre, instructor, description, userSub, toast) => {
  try {
    const response = await fetch(`${api}/class/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        genre,
        instructor,
        description,
        userSub
      }),
    });
    toast({
      title: 'Created successfully',
      description: message,
      status: 'success',
      duration: 9000,
      isClosable: true,
    })
    return response.json();
  } catch (error) {
    console.error('Error creating class:', error);
    throw error;
  }
};

export const deleteClass = async (documentID, sub, toast) => {
  try {
    const response = await fetch(`${api}/class/delete`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: documentID,
        userSub: sub 
      }),
    });

    toast({
      title: 'Deleted successfully',
      description: message,
      status: 'success',
      duration: 9000,
      isClosable: true,
    })
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error deleting class:', error);
    throw error;
  }
};

export const updateClass = async (documentID, title, description, genre, userSub, toast) => {
  try {
    const response = await fetch(`${api}/class/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: documentID,
        title,
        description,
        genre,
        userSub
      }),
    });

    toast({
      title: 'Updated successfully',
      description: message,
      status: 'success',
      duration: 9000,
      isClosable: true,
    })
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating class:', error);
    throw error;
  }
};

export const getClass = async (userSub) => {
  try {
    const response = await fetch(`${api}/class/get?userSub=${userSub}`, {
      method: 'GET', // Use POST or GET as appropriate
      headers: {
        'Content-Type': 'application/json', // Set the content type header
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
};
