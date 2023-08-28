const base_url = 'http://api.everyonestem.org/post';

export const createPost = async (classID, title, message, zoom, realworldApplication, githubURL, githubName, githubLanguage, githubCloneURL, youtubeID) => {
    try {
        const requestBody = {
            classID,
            title,
            message,
            ...(zoom !== "" && { zoom }),
            ...(realworldApplication !== "" && { realworldApplication }),
            ...(githubURL !== "" && {githubURL}),
            ...(githubName !== "" && {githubName}),
            ...(githubLanguage !== "" && {githubLanguage}),
            ...(githubCloneURL !== "" && {githubCloneURL}),
            ...(youtubeID !== "" && {youtubeID})
        };

        const response = await fetch(`${base_url}/create`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        });

        alert("Created post, please refresh your page");
        return response.json();
    } catch (error) {
        console.error("Error in creating post", error);
        throw error;
    }
};
