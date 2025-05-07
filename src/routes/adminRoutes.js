const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const roleAuth = require('../middleware/roleAuth');
const pool = require('../db');

// Get all users
router.get('/users', authMiddleware, roleAuth('admin'), async (req, res) => {
    try {
        const [users] = await pool.query(`
            SELECT u.*, 
                   CASE 
                       WHEN u.role = 'student' THEN s.name
                       WHEN u.role = 'teacher' THEN t.name
                       WHEN u.role = 'parent' THEN p.parent_id
                       ELSE NULL
                   END as profile_name
            FROM Users u
            LEFT JOIN Students s ON u.user_id = s.user_id
            LEFT JOIN Teachers t ON u.user_id = t.user_id
            LEFT JOIN Parents p ON u.user_id = p.user_id
        `);
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all students
router.get('/students', authMiddleware, roleAuth('admin'), async (req, res) => {
    try {
        const [students] = await pool.query(`
            SELECT s.*, u.email, t.name as teacher_name
            FROM Students s
            JOIN Users u ON s.user_id = u.user_id
            LEFT JOIN Teachers t ON s.grade = t.class_grade
        `);
        res.json(students);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all teachers
router.get('/teachers', authMiddleware, roleAuth('admin'), async (req, res) => {
    try {
        const [teachers] = await pool.query(`
            SELECT t.*, u.email,
                   COUNT(DISTINCT s.student_id) as student_count
            FROM Teachers t
            JOIN Users u ON t.user_id = u.user_id
            LEFT JOIN Students s ON t.class_grade = s.grade
            GROUP BY t.teacher_id
        `);
        res.json(teachers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all parents
router.get('/parents', authMiddleware, roleAuth('admin'), async (req, res) => {
    try {
        const [parents] = await pool.query(`
            SELECT p.*, u.email, s.name as student_name
            FROM Parents p
            JOIN Users u ON p.user_id = u.user_id
            JOIN Students s ON p.student_id = s.student_id
        `);
        res.json(parents);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get class statistics
router.get('/statistics/class/:grade', authMiddleware, roleAuth('admin'), async (req, res) => {
    try {
        const [stats] = await pool.query(`
            SELECT 
                s.grade,
                COUNT(DISTINCT s.student_id) as total_students,
                COUNT(DISTINCT t.teacher_id) as total_teachers,
                AVG(g.score) as average_score,
                COUNT(DISTINCT CASE WHEN a.status = 'present' THEN a.attendance_id END) * 100.0 / 
                COUNT(DISTINCT a.attendance_id) as attendance_rate
            FROM Students s
            LEFT JOIN Teachers t ON s.grade = t.class_grade
            LEFT JOIN Grades g ON s.student_id = g.student_id
            LEFT JOIN Attendance a ON s.student_id = a.student_id
            WHERE s.grade = ?
            GROUP BY s.grade
        `, [req.params.grade]);
        res.json(stats[0] || {});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router; 