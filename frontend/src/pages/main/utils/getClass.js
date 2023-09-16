import { api } from '../../config';

export const getClass = async (id) => {
  try {
    const response = await fetch(`${api}/class/getone?id=${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // You can add other headers like authentication tokens if needed
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
};