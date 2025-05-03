// src/routes/studentRoutes.js
const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.get('/', studentController.getAllStudents);        // GET /students
router.get('/:id', studentController.getStudentById);     // GET /students/:id
router.post('/', studentController.createStudent);        // POST /students
router.put('/:id', studentController.updateStudent);      // PUT /students/:id
router.delete('/:id', studentController.deleteStudent);   // DELETE /students/:id

module.exports = router;