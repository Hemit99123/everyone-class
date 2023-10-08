const Quiz = require('../models/quiz')

const QuizController = {
  createQuiz: async (req, res) => {
    try {
      const { quiz_title, classID, description, questions } = req.body;
      const newQuiz = new Quiz({ quiz_title, classID, description, questions });
      await newQuiz.save();
      res.status(201).json({ message: 'Created new class' });
    } catch (error) {
      console.error('Error in assigning a quiz:', error);
      res.status(500).json({ message: `Server error: ${error}`});
    }
  },
  getQuiz: async (req, res) => {
    try {
      const {classID} = req.query
      const allQuiz = await Quiz.find({classID})
      res.json(allQuiz)
    } catch(error) {
      console.error('Error getting class', error)
      res.status(500).json({message: `Server error ${error}`})
    }
  },
};

module.exports = QuizController;