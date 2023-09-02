// apiUtils.js
import { api, message as messageToast } from '../../config';
export const createPost = async (

  classID,
  title,
  message,
  zoom,
  realworldApplication,
  githubURL,
  githubName,
  githubLanguage,
  githubCloneURL,
  youtubeID,
  sketchfabHTML,
  sketchfabTitle,
  userSub,
  toast  // Pass the toast function as an argument
) => {
  try {
    const requestBody = {
      // required fields
      classID,
      title,
      message,
      // optional fields
      ...(zoom && { zoom }),
      ...(realworldApplication && { realworldApplication }),
      ...(githubURL && { githubURL }),
      ...(githubName && { githubName }),
      ...(githubLanguage && { githubLanguage }),
      ...(githubCloneURL && { githubCloneURL }),
      ...(youtubeID && { youtubeID }),
      ...(sketchfabHTML && { sketchfabHTML }),
      ...(sketchfabTitle && { sketchfabTitle }),
      userSub
    };

    const response = await fetch(`${api}/post/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    if (response.ok) {
      toast({
        title: 'Post was created successfully',
        description: messageToast,
        status: 'success',
        duration: 9000,
        isClosable: true
      });
    }

    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
