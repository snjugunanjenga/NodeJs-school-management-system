// src/routes/enrollmentRoutes.js
const express = require('express');
const router = express.Router();
const enrollmentController = require('../controllers/enrollmentController');

router.get('/', enrollmentController.getAllEnrollments);        // GET /enrollments
router.get('/:id', enrollmentController.getEnrollmentById);     // GET /enrollments/:id
router.post('/', enrollmentController.createEnrollment);        // POST /enrollments
router.put('/:id', enrollmentController.updateEnrollment);      // PUT /enrollments/:id
router.delete('/:id', enrollmentController.deleteEnrollment);   // DELETE /enrollments/:id

module.exports = router;