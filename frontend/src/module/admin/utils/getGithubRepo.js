const getGithubRepo = async (owner, repo) => {
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

export default getGithubRepo;