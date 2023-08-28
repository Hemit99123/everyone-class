const express = require('express')
const router = express.Router();
const classroomController = require('../controllers/classroomController');

// Define routes
router.post('/create', classroomController.createClass);
router.get("/get", classroomController.getClass)
router.post("/getone", classroomController.getOneClass)
router.delete("/delete", classroomController.deleteClass)
router.put("/update", classroomController.updateClass)
module.exports = router;