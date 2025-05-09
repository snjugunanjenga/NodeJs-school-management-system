// src/routes/studentRoutes.js
const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const db = require('../config/database');

// Get all students (admin only)
router.get('/', authenticateToken, (req, res) => {
    db.query('SELECT * FROM Students')
        .then(([rows]) => res.json(rows))
        .catch(error => {
            console.error('Error fetching students:', error);
            res.status(500).json({ error: 'Failed to fetch students' });
        });
});

// Get student by ID
router.get('/:id', authenticateToken, (req, res) => {
    const studentId = req.params.id;
    db.query('SELECT * FROM Students WHERE student_id = ?', [studentId])
        .then(([rows]) => {
            if (rows.length === 0) {
                return res.status(404).json({ error: 'Student not found' });
            }
            res.json(rows[0]);
        })
        .catch(error => {
            console.error('Error fetching student:', error);
            res.status(500).json({ error: 'Failed to fetch student' });
        });
});

// Create new student
router.post('/', authenticateToken, (req, res) => {
    const { name, dob, gender, grade } = req.body;
    db.query(
        'INSERT INTO Students (name, dob, gender, grade) VALUES (?, ?, ?, ?)',
        [name, dob, gender, grade]
    )
        .then(([result]) => {
            res.status(201).json({
                message: 'Student created successfully',
                studentId: result.insertId
            });
        })
        .catch(error => {
            console.error('Error creating student:', error);
            res.status(500).json({ error: 'Failed to create student' });
        });
});

// Update student
router.put('/:id', authenticateToken, (req, res) => {
    const studentId = req.params.id;
    const { name, dob, gender, grade } = req.body;
    db.query(
        'UPDATE Students SET name = ?, dob = ?, gender = ?, grade = ? WHERE student_id = ?',
        [name, dob, gender, grade, studentId]
    )
        .then(([result]) => {
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Student not found' });
            }
            res.json({ message: 'Student updated successfully' });
        })
        .catch(error => {
            console.error('Error updating student:', error);
            res.status(500).json({ error: 'Failed to update student' });
        });
});

// Delete student
router.delete('/:id', authenticateToken, (req, res) => {
    const studentId = req.params.id;
    db.query('DELETE FROM Students WHERE student_id = ?', [studentId])
        .then(([result]) => {
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Student not found' });
            }
            res.json({ message: 'Student deleted successfully' });
        })
        .catch(error => {
            console.error('Error deleting student:', error);
            res.status(500).json({ error: 'Failed to delete student' });
        });
});

// Get student's grades
router.get('/:id/grades', authenticateToken, (req, res) => {
    const studentId = req.params.id;
    db.query(`
        SELECT g.*, s.name as subject_name 
        FROM Grades g 
        JOIN Subjects s ON g.subject_id = s.subject_id 
        WHERE g.student_id = ?
    `, [studentId])
        .then(([rows]) => res.json(rows))
        .catch(error => {
            console.error('Error fetching grades:', error);
            res.status(500).json({ error: 'Failed to fetch grades' });
        });
});

// Get student's attendance
router.get('/:id/attendance', authenticateToken, (req, res) => {
    const studentId = req.params.id;
    db.query(
        'SELECT * FROM Attendance WHERE student_id = ? ORDER BY date DESC',
        [studentId]
    )
        .then(([rows]) => res.json(rows))
        .catch(error => {
            console.error('Error fetching attendance:', error);
            res.status(500).json({ error: 'Failed to fetch attendance' });
        });
});

module.exports = router;


