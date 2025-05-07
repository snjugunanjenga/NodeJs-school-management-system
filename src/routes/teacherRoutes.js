// src/routes/teacherRoutes.js
const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');
const authMiddleware = require('../middleware/auth');
const roleAuth = require('../middleware/roleAuth');
const pool = require('../db');

router.get('/', teacherController.getAllTeachers);        // GET /teachers
router.get('/:id', teacherController.getTeacherById);     // GET /teachers/:id
router.post('/', teacherController.createTeacher);        // POST /teachers
router.put('/:id', teacherController.updateTeacher);      // PUT /teachers/:id
router.delete('/:id', teacherController.deleteTeacher);   // DELETE /teachers/:id

// Get teacher's class students
router.get('/class', authMiddleware, roleAuth('teacher'), async (req, res) => {
    try {
        const [students] = await pool.query(`
            SELECT s.* 
            FROM Students s 
            WHERE s.grade = ?
        `, [req.auth.class_grade]);
        res.json(students);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get class grades
router.get('/class/grades', authMiddleware, roleAuth('teacher'), async (req, res) => {
    try {
        const [grades] = await pool.query(`
            SELECT g.*, s.name as student_name, sub.name as subject_name
            FROM Grades g
            JOIN Students s ON g.student_id = s.student_id
            JOIN Subjects sub ON g.subject_id = sub.subject_id
            WHERE s.grade = ? AND sub.grade_level = ?
        `, [req.auth.class_grade, req.auth.class_grade]);
        res.json(grades);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add/Update grade
router.post('/grades', authMiddleware, roleAuth('teacher'), async (req, res) => {
    const { student_id, subject_id, term, score } = req.body;
    try {
        const [result] = await pool.query(`
            INSERT INTO Grades (student_id, subject_id, term, score)
            VALUES (?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE score = ?
        `, [student_id, subject_id, term, score, score]);
        res.json({ message: 'Grade updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Mark attendance
router.post('/attendance', authMiddleware, roleAuth('teacher'), async (req, res) => {
    const { student_id, date, status } = req.body;
    try {
        const [result] = await pool.query(`
            INSERT INTO Attendance (student_id, date, status)
            VALUES (?, ?, ?)
            ON DUPLICATE KEY UPDATE status = ?
        `, [student_id, date, status, status]);
        res.json({ message: 'Attendance marked successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get class attendance
router.get('/class/attendance', authMiddleware, roleAuth('teacher'), async (req, res) => {
    try {
        const [attendance] = await pool.query(`
            SELECT a.*, s.name as student_name
            FROM Attendance a
            JOIN Students s ON a.student_id = s.student_id
            WHERE s.grade = ?
            ORDER BY a.date DESC, s.name
        `, [req.auth.class_grade]);
        res.json(attendance);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;