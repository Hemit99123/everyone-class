// app.js
const express = require('express');
const mongoose = require('mongoose');
const classRoute = require('./routes/classRoute');
const postRoute = require('./routes/postRoute')
const indexRoute = require('./routes/indexRoute')
const cors = require('cors')
const app = express();
const PORT = process.env.PORT || 3001;

// Connect to MongoDB
mongoose.connect('mongodb+srv://patelvhemit:WHJv5u4mXgtJnJfZ@cluster0.m4sxpfa.mongodb.net/classroom?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware
app.use(express.json());
app.use(cors())

// Routes
app.use('/', indexRoute)
app.use('/class', classRoute);
app.use('/post', postRoute)

// Start server
app.listen(PORT);