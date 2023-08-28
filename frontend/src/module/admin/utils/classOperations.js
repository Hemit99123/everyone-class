const base_url = 'https:///api.everyonestem.org/class'

export const createClass = async (title, genre, instructor, description, userSub) => {
  try {
    const response = await fetch(`${base_url}/create`, {
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
    alert('Created successfully, refresh your page to see the changes');
    return response.json();
  } catch (error) {
    console.error('Error creating class:', error);
    throw error;
  }
};

export const deleteClass = async (documentID) => {
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

export const updateClass = async (documentID, title, instructor, description, genre) => {
  try {
    const response = await fetch(`${base_url}/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: documentID,
        title,
        instructor,
        description,
        genre,
      }),
    });

    alert('Updated successfully, refresh your page to see the changes');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating class:', error);
    throw error;
  }
};

export const getClass = async (userSub) => {
  try {
    const response = await fetch(`${base_url}/get`, {
      method: 'POST', // Use POST or GET as appropriate
      headers: {
        'Content-Type': 'application/json', // Set the content type header
      },
      body: JSON.stringify({ userSub }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
};
