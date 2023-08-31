const base_url = 'https://api.everyonestem.org/post';

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
  sketchfabTitle
) => {
  try {
    const requestBody = {
      //required fields
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
      ...(sketchfabHTML && {sketchfabHTML}),
      ...(sketchfabTitle && {sketchfabTitle})

    };

    const response = await fetch(`${base_url}/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    if (response.ok) {
      alert('Post created successfully. Please refresh the page.');
    } else {
      alert('Error creating the post.');
    }

    return response.json();
  } catch (error) {
    alert('An error occurred while creating the post.', error);
    throw error;
  }
};