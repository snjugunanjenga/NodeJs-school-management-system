// src/routes/teacherRoutes.js
const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');

router.get('/', teacherController.getAllTeachers);        // GET /teachers
router.get('/:id', teacherController.getTeacherById);     // GET /teachers/:id
router.post('/', teacherController.createTeacher);        // POST /teachers
router.put('/:id', teacherController.updateTeacher);      // PUT /teachers/:id
router.delete('/:id', teacherController.deleteTeacher);   // DELETE /teachers/:id

module.exports = router;