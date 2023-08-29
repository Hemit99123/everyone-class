const Class = require('../models/classroom');
const Post = require('../models/post')
const ClassController = {
  createClass: async (req, res) => {
    try {
      const { title, genre, instructor, description, userSub } = req.body;
      const newClass = new Class({ title, genre, instructor, description, userSub });
      await newClass.save();
      res.status(201).json({ message: 'Created new class' });
    } catch (error) {
      console.error('Error in createClass:', error);
      res.status(500).json({ message: `Server error: ${error}`});
    }
  },
  deleteClass: async (req, res) => {
    try {
      const { id } = req.body;
  
      // Use findByIdAndDelete to directly delete the class by its _id
      const deletedClass = await Class.findByIdAndDelete(id);
      await Post.deleteMany({classID: id})
  
      if (!deletedClass) {
        return res.status(404).json({ message: 'Class not found' });
      }

  
      res.status(200).json({ message: 'Class deleted successfully' });
    } catch (error) {
      console.error('Error in deleting:', error);
      res.status(500).json({ message: `Server error: ${error}` });
    }
  },
  updateClass: async (req,res) => {
    const {id, title, description, genre} = req.body
    try {
      const updatedClass = await Class.updateOne({_id: id}, {
        $set : {
          title,
          description,
          genre
        }
      })
      res.status(200).json({message: updatedClass})
    } catch (error) {
      console.error('Error in updating', error)
      res.status(500).json({ message: `Server error: ${error}` })
    }
  },
  
  getClass: async (req, res) => {
    try {
      const {userSub} = req.query
      const allClasses = await Class.find({userSub})
      res.json(allClasses)
    } catch(error) {
      console.error('Error getting class', error)
      res.status(500).json({message: `Server error ${error}`})
    }
  },
  getOneClass: async (req,res) => {
    try {
      const {id} = req.body
      const classroom = await Class.findOne({_id: id})
      res.json(classroom)
    } catch(error) {
      res.status(500).json({message: error})
    }
  }
};

module.exports = ClassController;
