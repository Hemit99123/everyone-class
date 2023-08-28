const base_url = 'http://localhost:3001/post'

export const getPost = async (id) => {
    try {
      const response = await fetch(`${base_url}/get`, {
        method: 'POST', // Use POST or GET as appropriate
        headers: {
          'Content-Type': 'application/json', // Set the content type header
        },
        body: JSON.stringify({ classID: id }),
      });
  
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error:", error);
      throw error; // Re-throw the error to be handled by the caller
    }
  };

  export const deletePost = async (documentID) => {
    try {
      const response = await fetch(`${base_url}/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: documentID,
        }),
      });

      alert('Deleted successfully, refresh your page to see the changes');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error deleting class:', error);
      throw error;
    }
  };
  