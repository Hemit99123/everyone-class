const Post = require('../models/post')

const postController = {
    createPost: async (req,res) => {
        try {
            const {classID, title, message, zoom, realworldApplication, githubURL, githubName, githubLanguage, githubCloneURL, youtubeID} = req.body
            const newPost = new Post({classID, title, message, zoom, realworldApplication, githubURL, githubName, githubLanguage, githubCloneURL, youtubeID})
            await newPost.save()
            res.status(201).json({message: "Created post sucessfully"})
        } catch(error) {
            res.status(500).json({message: error})
        }
    },
    getPost: async (req, res) => {
      try {
          const { classID } = req.body;
          const allPost = await Post.find({ classID: classID })
              .sort({ _id: -1 }); // Sort in descending order of _id (timestamp)
          res.json(allPost);
      } catch (error) {
          res.status(500).json({ message: error });
      }
  },  
      deletePost: async (req, res) => {
        try {
          const { id } = req.body;
      
          // Use findByIdAndDelete to directly delete the class by its _id
          const deletePost = await Post.findByIdAndDelete(id);
      
          if (!deletePost) {
            return res.status(404).json({ message: 'Post not found' });
          }
    
      
          res.status(200).json({ message: 'Post deleted successfully' });
        } catch (error) {
          console.error('Error in deleting:', error);
          res.status(500).json({ message: `Server error: ${error}` });
        }
      }
        
}

module.exports = postController 