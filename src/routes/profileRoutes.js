const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const db = require('../config/database');

// Get user profile
router.get('/', authenticateToken, (req, res) => {
    const userId = req.user.id;
    const userRole = req.user.role;

    // Get user details based on role
    let query;
    let params = [userId];

    switch (userRole) {
        case 'student':
            query = 'SELECT * FROM Students WHERE user_id = ?';
            break;
        case 'teacher':
            query = 'SELECT * FROM Teachers WHERE user_id = ?';
            break;
        case 'parent':
            query = 'SELECT * FROM Parents WHERE user_id = ?';
            break;
        default:
            query = 'SELECT * FROM Users WHERE id = ?';
    }

    db.query(query, params)
        .then(([rows]) => {
            if (!rows || rows.length === 0) {
                return res.status(404).json({ error: 'Profile not found' });
            }
            res.json(rows[0]);
        })
        .catch(error => {
            console.error('Error fetching profile:', error);
            res.status(500).json({ error: 'Failed to fetch profile' });
        });
});

// Update user profile
router.put('/', authenticateToken, (req, res) => {
    const userId = req.user.id;
    const userRole = req.user.role;
    const updates = req.body;

    // Update user details based on role
    let query;
    let params;

    switch (userRole) {
        case 'student':
            query = 'UPDATE Students SET name = ?, dob = ?, gender = ? WHERE user_id = ?';
            params = [updates.name, updates.dob, updates.gender, userId];
            break;
        case 'teacher':
            query = 'UPDATE Teachers SET name = ?, subject = ?, class_grade = ? WHERE user_id = ?';
            params = [updates.name, updates.subject, updates.class_grade, userId];
            break;
        case 'parent':
            query = 'UPDATE Users SET email = ? WHERE id = ?';
            params = [updates.email, userId];
            break;
        default:
            query = 'UPDATE Users SET email = ? WHERE id = ?';
            params = [updates.email, userId];
    }

    db.query(query, params)
        .then(([result]) => {
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Profile not found' });
            }
            res.json({ message: 'Profile updated successfully' });
        })
        .catch(error => {
            console.error('Error updating profile:', error);
            res.status(500).json({ error: 'Failed to update profile' });
        });
});

module.exports = router; 