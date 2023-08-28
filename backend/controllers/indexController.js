const indexController = {
    get: async (req, res) => {
        try {
            const jsonResponse = {
                message: "Welcome to the official Everyone API!",
                description: "This is the default endpoint of the API.",
                timestamp: new Date().toISOString()
            };

            res.status(200).json(jsonResponse);
        } catch (error) {
            res.status(500).json({ error: "An error occurred." });
        }
    }
};

module.exports = indexController;
