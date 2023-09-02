const Post = require('../models/post')
const Class = require('../models/classroom')

const postController = {
    createPost: async (req,res) => {
      const {classID, title, message, zoom, realworldApplication, githubURL, githubName, githubLanguage, githubCloneURL, youtubeID, sketchfabHTML, sketchfabTitle, userSub} = req.body
      // Use findById to retrieve the class by its _id
      const classSub = await Class.findById(classID);

      const docsUserSub = classSub.userSub

      if(docsUserSub === userSub) {
        try {
          const newPost = new Post({classID, title, message, zoom, realworldApplication, githubURL, githubName, githubLanguage, githubCloneURL, youtubeID, sketchfabHTML, sketchfabTitle})
          await newPost.save()
          res.status(201).json({message: "Created post sucessfully"})
      } catch(error) {
          res.status(500).json({message: error})
      }
      } else {
        res.status(403).json({message: "Unauthorized"})
      }

    },
    getPost: async (req, res) => {
      try {
          const { classID } = req.query;
          const allPost = await Post.find({ classID })
              .sort({ _id: -1 }); // Sort in descending order of _id (timestamp)
          res.json(allPost);
      } catch (error) {
          res.status(500).json({ message: error });
      }
  },  
  deletePost: async (req, res) => {
    try {
      const { id, userSub } = req.body;
  
      // Use findById to retrieve the post by its _id
      const post = await Post.findById(id);
  
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      const classID = post.classID;
  
      // Use findById to retrieve the class by its _id
      const classSub = await Class.findById(classID);
  
      if (!classSub) {
        return res.status(404).json({ message: 'Class not found' });
      }
  
      const docsUserSub = classSub.userSub;
  
      if (docsUserSub === userSub) {
        const deletedPost = await Post.findByIdAndDelete(id);
  
        if (!deletedPost) {
          return res.status(500).json({ message: 'Failed to delete post' });
        }
  
        return res.status(200).json({ message: 'Post deleted successfully' });
      } else {
        return res.status(403).json({ message: 'Unauthorized' });
      }
    } catch (error) {
      console.error('Error in deleting:', error);
      res.status(500).json({ message: `Server error: ${error.message}` });
    }
  }
  
        
}

module.exports = postController 