const mongoose = require('mongoose')
const quizSchema = new mongoose.Schema({
  quiz_title: {type: String, required: true},
  classID: {type: String, required: true},
  description: {type: String, required: true},
  questions: {type: Array, required: true}
});

module.exports = mongoose.model('Quiz', quizSchema);