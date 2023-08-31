const mongoose = require('mongoose')
const postSchema = new mongoose.Schema({
  classID: {type: String, required: true},
  title: { type: String, required: true },
  message: {type: String, required: true},
  zoom: {type: String, required: false},
  realworldApplication: {type: String, required: false},
  githubURL: {type: String, required: false},
  githubName: {type: String, required: false},
  githubLanguage: {type: String, required: false},
  githubCloneURL: {type: String, required: false},
  youtubeID: {type: String, required: false},
  sketchfabHTML: {type: String, required: false},
  sketchfabTitle: {type: String, required: false}
});

module.exports = mongoose.model('Post', postSchema);