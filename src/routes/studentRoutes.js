// src/routes/studentRoutes.js
const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const authMiddleware = require('../middleware/auth');
const roleAuth = require('../middleware/roleAuth');
const pool = require('../db');

router.get('/', studentController.getAllStudents);        // GET /students
router.get('/:id', studentController.getStudentById);     // GET /students/:id
router.post('/', studentController.createStudent);        // POST /students
router.put('/:id', studentController.updateStudent);      // PUT /students/:id
router.delete('/:id', studentController.deleteStudent);   // DELETE /students/:id

// Get student's own grades
router.get('/grades', authMiddleware, roleAuth('student'), async (req, res) => {
    try {
        const [grades] = await pool.query(`
            SELECT g.*, s.name as subject_name 
            FROM Grades g 
            JOIN Subjects s ON g.subject_id = s.subject_id 
            WHERE g.student_id = ?
        `, [req.auth.student_id]);
        res.json(grades);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get student's attendance
router.get('/attendance', authMiddleware, roleAuth('student'), async (req, res) => {
    try {
        const [attendance] = await pool.query(
            'SELECT * FROM Attendance WHERE student_id = ? ORDER BY date DESC',
            [req.auth.student_id]
        );
        res.json(attendance);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get student's profile
router.get('/profile', authMiddleware, roleAuth('student'), async (req, res) => {
    try {
        const [students] = await pool.query(
            'SELECT * FROM Students WHERE student_id = ?',
            [req.auth.student_id]
        );
        if (students.length === 0) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.json(students[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;


