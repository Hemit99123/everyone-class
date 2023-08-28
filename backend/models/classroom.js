const mongoose = require('mongoose')
const classSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: {type: String, required: true},
  instructor: {type: String, required: true},
  description: {type: String, required: true},
  userSub: {type: String, required: true}
});

module.exports = mongoose.model('Class', classSchema);