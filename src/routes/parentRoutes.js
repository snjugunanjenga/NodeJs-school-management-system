const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const db = require('../config/database');

// Get all parents
router.get('/', authenticateToken, (req, res) => {
    db.query('SELECT * FROM Parents')
        .then(([rows]) => res.json(rows))
        .catch(error => {
            console.error('Error fetching parents:', error);
            res.status(500).json({ error: 'Failed to fetch parents' });
        });
});

// Get parent by ID
router.get('/:id', authenticateToken, (req, res) => {
    const parentId = req.params.id;
    db.query('SELECT * FROM Parents WHERE parent_id = ?', [parentId])
        .then(([rows]) => {
            if (rows.length === 0) {
                return res.status(404).json({ error: 'Parent not found' });
            }
            res.json(rows[0]);
        })
        .catch(error => {
            console.error('Error fetching parent:', error);
            res.status(500).json({ error: 'Failed to fetch parent' });
        });
});

// Get parent's children
router.get('/:id/children', authenticateToken, (req, res) => {
    const parentId = req.params.id;
    db.query(`
        SELECT s.* 
        FROM Students s
        JOIN Parents p ON s.student_id = p.student_id
        WHERE p.parent_id = ?
    `, [parentId])
        .then(([rows]) => res.json(rows))
        .catch(error => {
            console.error('Error fetching children:', error);
            res.status(500).json({ error: 'Failed to fetch children' });
        });
});

// Get child's grades
router.get('/:id/children/:studentId/grades', authenticateToken, (req, res) => {
    const { studentId } = req.params;
    db.query(`
        SELECT g.*, s.name as subject_name 
        FROM Grades g 
        JOIN Subjects s ON g.subject_id = s.subject_id 
        WHERE g.student_id = ?
        ORDER BY s.name, g.term
    `, [studentId])
        .then(([rows]) => res.json(rows))
        .catch(error => {
            console.error('Error fetching grades:', error);
            res.status(500).json({ error: 'Failed to fetch grades' });
        });
});

// Get child's attendance
router.get('/:id/children/:studentId/attendance', authenticateToken, (req, res) => {
    const { studentId } = req.params;
    db.query(`
        SELECT * FROM Attendance 
        WHERE student_id = ? 
        ORDER BY date DESC
    `, [studentId])
        .then(([rows]) => res.json(rows))
        .catch(error => {
            console.error('Error fetching attendance:', error);
            res.status(500).json({ error: 'Failed to fetch attendance' });
        });
});

// Get child's profile
router.get('/:id/children/:studentId/profile', authenticateToken, (req, res) => {
    const { studentId } = req.params;
    db.query(`
        SELECT s.*, t.name as teacher_name, t.subject
        FROM Students s
        LEFT JOIN Teachers t ON s.grade = t.class_grade
        WHERE s.student_id = ?
    `, [studentId])
        .then(([rows]) => {
            if (rows.length === 0) {
                return res.status(404).json({ error: 'Student not found' });
            }
            res.json(rows[0]);
        })
        .catch(error => {
            console.error('Error fetching student profile:', error);
            res.status(500).json({ error: 'Failed to fetch student profile' });
        });
});

module.exports = router; 