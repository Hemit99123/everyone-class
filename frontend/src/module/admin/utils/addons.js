export const getGithubRepo = async (owner, repo) => {
    // Construct the API URL
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}`;

    try {
        // Fetch repository information
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error("API request failed");
        }

        const repoInfo = await response.json();
        return repoInfo

    } catch (error) {
        throw new Error("Error fetching repository information");
    }
};

export const getSketchfab = async (model_url) => {
    // Construct the API URL
    const apiUrl = `https://sketchfab.com/oembed?url=${model_url}`;

    try {
        // Fetch repository information
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error("API request failed");
        }

        const modelInfo = await response.json();
        console.log(modelInfo)
        return modelInfo

    } catch (error) {
        throw new Error("Error fetching repository information");
    }
};

export const  youtube =  (url) => {
    // Match both standard and shortened YouTube URLs
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?.*v=|embed\/|v\/|.*[&?])v=)([^&?]+)/);
    return match && match[1] ? match[1] : null;
}