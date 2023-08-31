import {api} from '../../config'

export const getOneClass = async (id) => {
    try {
      const response = await fetch(`${api}/class/getone`, {
        method: 'POST', // Use POST or GET as appropriate
        headers: {
          'Content-Type': 'application/json', // Set the content type header
        },
        body: JSON.stringify({ id }),
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