const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const db = require('../config/database');

// Get all users
router.get('/users', authenticateToken, (req, res) => {
    db.query(`
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
    `)
        .then(([rows]) => res.json(rows))
        .catch(error => {
            console.error('Error fetching users:', error);
            res.status(500).json({ error: 'Failed to fetch users' });
        });
});

// Get all students
router.get('/students', authenticateToken, (req, res) => {
    db.query(`
        SELECT s.*, u.email, t.name as teacher_name
        FROM Students s
        JOIN Users u ON s.user_id = u.user_id
        LEFT JOIN Teachers t ON s.grade = t.class_grade
    `)
        .then(([rows]) => res.json(rows))
        .catch(error => {
            console.error('Error fetching students:', error);
            res.status(500).json({ error: 'Failed to fetch students' });
        });
});

// Get all teachers
router.get('/teachers', authenticateToken, (req, res) => {
    db.query(`
        SELECT t.*, u.email,
               COUNT(DISTINCT s.student_id) as student_count
        FROM Teachers t
        JOIN Users u ON t.user_id = u.user_id
        LEFT JOIN Students s ON t.class_grade = s.grade
        GROUP BY t.teacher_id
    `)
        .then(([rows]) => res.json(rows))
        .catch(error => {
            console.error('Error fetching teachers:', error);
            res.status(500).json({ error: 'Failed to fetch teachers' });
        });
});

// Get all parents
router.get('/parents', authenticateToken, (req, res) => {
    db.query(`
        SELECT p.*, u.email, s.name as student_name
        FROM Parents p
        JOIN Users u ON p.user_id = u.user_id
        JOIN Students s ON p.student_id = s.student_id
    `)
        .then(([rows]) => res.json(rows))
        .catch(error => {
            console.error('Error fetching parents:', error);
            res.status(500).json({ error: 'Failed to fetch parents' });
        });
});

// Get class statistics
router.get('/statistics/class/:grade', authenticateToken, (req, res) => {
    const grade = req.params.grade;
    db.query(`
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
    `, [grade])
        .then(([rows]) => res.json(rows[0] || {}))
        .catch(error => {
            console.error('Error fetching class statistics:', error);
            res.status(500).json({ error: 'Failed to fetch class statistics' });
        });
});

// Get overall statistics
router.get('/statistics/overall', authenticateToken, (req, res) => {
    db.query(`
        SELECT 
            COUNT(DISTINCT s.student_id) as total_students,
            COUNT(DISTINCT t.teacher_id) as total_teachers,
            COUNT(DISTINCT p.parent_id) as total_parents,
            COUNT(DISTINCT s.grade) as total_classes,
            AVG(g.score) as overall_average_score,
            COUNT(DISTINCT CASE WHEN a.status = 'present' THEN a.attendance_id END) * 100.0 / 
            COUNT(DISTINCT a.attendance_id) as overall_attendance_rate
        FROM Students s
        LEFT JOIN Teachers t ON s.grade = t.class_grade
        LEFT JOIN Parents p ON s.student_id = p.student_id
        LEFT JOIN Grades g ON s.student_id = g.student_id
        LEFT JOIN Attendance a ON s.student_id = a.student_id
    `)
        .then(([rows]) => res.json(rows[0] || {}))
        .catch(error => {
            console.error('Error fetching overall statistics:', error);
            res.status(500).json({ error: 'Failed to fetch overall statistics' });
        });
});

module.exports = router; 