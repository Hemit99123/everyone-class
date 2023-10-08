import { api } from '../../config';

export const getQuiz = async (classID) => {
  try {
    if (!classID) {
      throw new Error('classID is required');
    }

    const response = await fetch(`${api}/quiz/get?classID=${classID}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();  // Get the error text from the response
      throw new Error(`Network response was not ok: ${response.status} ${response.statusText}. Error: ${errorText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
};
