const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const roleAuth = require('../middleware/roleAuth');
const pool = require('../db');

// Get child's grades
router.get('/child/grades', authMiddleware, roleAuth('parent'), async (req, res) => {
    try {
        const [grades] = await pool.query(`
            SELECT g.*, s.name as subject_name 
            FROM Grades g 
            JOIN Subjects s ON g.subject_id = s.subject_id 
            WHERE g.student_id = ?
            ORDER BY s.name, g.term
        `, [req.auth.student_id]);
        res.json(grades);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get child's attendance
router.get('/child/attendance', authMiddleware, roleAuth('parent'), async (req, res) => {
    try {
        const [attendance] = await pool.query(`
            SELECT * FROM Attendance 
            WHERE student_id = ? 
            ORDER BY date DESC
        `, [req.auth.student_id]);
        res.json(attendance);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get child's profile
router.get('/child/profile', authMiddleware, roleAuth('parent'), async (req, res) => {
    try {
        const [students] = await pool.query(`
            SELECT s.*, t.name as teacher_name, t.subject
            FROM Students s
            LEFT JOIN Teachers t ON s.grade = t.class_grade
            WHERE s.student_id = ?
        `, [req.auth.student_id]);
        if (students.length === 0) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.json(students[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router; 