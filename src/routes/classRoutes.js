// src/routes/classRoutes.js
const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController');

router.get('/', classController.getAllClasses);        // GET /classes
router.get('/:id', classController.getClassById);     // GET /classes/:id
router.post('/', classController.createClass);        // POST /classes
router.put('/:id', classController.updateClass);      // PUT /classes/:id
router.delete('/:id', classController.deleteClass);   // DELETE /classes/:id

module.exports = router;