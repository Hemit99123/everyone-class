import {api} from '../../config'

export const createQuiz = async (quiz_title, classID, description, questions) => {
  try {
    const response = await fetch(`${api}/quiz/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        quiz_title,
        classID,
        description,
        questions
      }),
    });
    return response.json();
  } catch (error) {
    console.error('Error creating class:', error);
    throw error;
  }
};