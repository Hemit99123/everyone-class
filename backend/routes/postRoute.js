const express = require('express')
const router = express.Router()
const postController = require('../controllers/postController')

router.post('/create', postController.createPost)
router.get('/get', postController.getPost)
router.delete('/delete', postController.deletePost)
module.exports = router;