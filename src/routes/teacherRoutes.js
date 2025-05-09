// src/routes/teacherRoutes.js
const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const db = require('../config/database');

// Get all teachers
router.get('/', authenticateToken, (req, res) => {
    db.query('SELECT * FROM Teachers')
        .then(([rows]) => res.json(rows))
        .catch(error => {
            console.error('Error fetching teachers:', error);
            res.status(500).json({ error: 'Failed to fetch teachers' });
        });
});

// Get teacher by ID
router.get('/:id', authenticateToken, (req, res) => {
    const teacherId = req.params.id;
    db.query('SELECT * FROM Teachers WHERE teacher_id = ?', [teacherId])
        .then(([rows]) => {
            if (rows.length === 0) {
                return res.status(404).json({ error: 'Teacher not found' });
            }
            res.json(rows[0]);
        })
        .catch(error => {
            console.error('Error fetching teacher:', error);
            res.status(500).json({ error: 'Failed to fetch teacher' });
        });
});

// Create new teacher
router.post('/', authenticateToken, (req, res) => {
    const { name, subject, class_grade } = req.body;
    db.query(
        'INSERT INTO Teachers (name, subject, class_grade) VALUES (?, ?, ?)',
        [name, subject, class_grade]
    )
        .then(([result]) => {
            res.status(201).json({
                message: 'Teacher created successfully',
                teacherId: result.insertId
            });
        })
        .catch(error => {
            console.error('Error creating teacher:', error);
            res.status(500).json({ error: 'Failed to create teacher' });
        });
});

// Update teacher
router.put('/:id', authenticateToken, (req, res) => {
    const teacherId = req.params.id;
    const { name, subject, class_grade } = req.body;
    db.query(
        'UPDATE Teachers SET name = ?, subject = ?, class_grade = ? WHERE teacher_id = ?',
        [name, subject, class_grade, teacherId]
    )
        .then(([result]) => {
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Teacher not found' });
            }
            res.json({ message: 'Teacher updated successfully' });
        })
        .catch(error => {
            console.error('Error updating teacher:', error);
            res.status(500).json({ error: 'Failed to update teacher' });
        });
});

// Delete teacher
router.delete('/:id', authenticateToken, (req, res) => {
    const teacherId = req.params.id;
    db.query('DELETE FROM Teachers WHERE teacher_id = ?', [teacherId])
        .then(([result]) => {
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Teacher not found' });
            }
            res.json({ message: 'Teacher deleted successfully' });
        })
        .catch(error => {
            console.error('Error deleting teacher:', error);
            res.status(500).json({ error: 'Failed to delete teacher' });
        });
});

// Get teacher's class students
router.get('/:id/class', authenticateToken, (req, res) => {
    const teacherId = req.params.id;
    db.query(`
        SELECT s.* 
        FROM Students s 
        JOIN Teachers t ON s.grade = t.class_grade
        WHERE t.teacher_id = ?
    `, [teacherId])
        .then(([rows]) => res.json(rows))
        .catch(error => {
            console.error('Error fetching class students:', error);
            res.status(500).json({ error: 'Failed to fetch class students' });
        });
});

// Get class grades
router.get('/:id/class/grades', authenticateToken, (req, res) => {
    const teacherId = req.params.id;
    db.query(`
        SELECT g.*, s.name as student_name, sub.name as subject_name
        FROM Grades g
        JOIN Students s ON g.student_id = s.student_id
        JOIN Subjects sub ON g.subject_id = sub.subject_id
        JOIN Teachers t ON s.grade = t.class_grade
        WHERE t.teacher_id = ?
    `, [teacherId])
        .then(([rows]) => res.json(rows))
        .catch(error => {
            console.error('Error fetching class grades:', error);
            res.status(500).json({ error: 'Failed to fetch class grades' });
        });
});

// Add/Update grade
router.post('/:id/grades', authenticateToken, (req, res) => {
    const { student_id, subject_id, term, score } = req.body;
    db.query(`
        INSERT INTO Grades (student_id, subject_id, term, score)
        VALUES (?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE score = ?
    `, [student_id, subject_id, term, score, score])
        .then(() => res.json({ message: 'Grade updated successfully' }))
        .catch(error => {
            console.error('Error updating grade:', error);
            res.status(500).json({ error: 'Failed to update grade' });
        });
});

// Mark attendance
router.post('/:id/attendance', authenticateToken, (req, res) => {
    const { student_id, date, status } = req.body;
    db.query(`
        INSERT INTO Attendance (student_id, date, status)
        VALUES (?, ?, ?)
        ON DUPLICATE KEY UPDATE status = ?
    `, [student_id, date, status, status])
        .then(() => res.json({ message: 'Attendance marked successfully' }))
        .catch(error => {
            console.error('Error marking attendance:', error);
            res.status(500).json({ error: 'Failed to mark attendance' });
        });
});

// Get class attendance
router.get('/:id/class/attendance', authenticateToken, (req, res) => {
    const teacherId = req.params.id;
    db.query(`
        SELECT a.*, s.name as student_name
        FROM Attendance a
        JOIN Students s ON a.student_id = s.student_id
        JOIN Teachers t ON s.grade = t.class_grade
        WHERE t.teacher_id = ?
        ORDER BY a.date DESC, s.name
    `, [teacherId])
        .then(([rows]) => res.json(rows))
        .catch(error => {
            console.error('Error fetching class attendance:', error);
            res.status(500).json({ error: 'Failed to fetch class attendance' });
        });
});

module.exports = router;