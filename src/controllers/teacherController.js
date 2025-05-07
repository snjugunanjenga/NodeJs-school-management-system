// src/controllers/teacherController.js
const pool = require('../db');

/**
 * Get all teachers
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function getAllTeachers(req, res) {
    try {
        const [rows] = await pool.query('SELECT * FROM Teachers');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

/**
 * Get a teacher by ID
 * @param {Object} req - Express request object with params.id
 * @param {Object} res - Express response object
 */
async function getTeacherById(req, res) {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM Teachers WHERE teacher_id = ?', [id]);
        if (rows.length === 0) return res.status(404).json({ error: 'Teacher not found' });
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

/**
 * Create a new teacher
 * @param {Object} req - Express request object with body (name, email, subject)
 * @param {Object} res - Express response object
 */
async function createTeacher(req, res) {
    const { name, email, subject } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO Teachers (name, email, subject) VALUES (?, ?, ?)',
            [name, email, subject]
        );
        res.status(201).json({ id: result.insertId, name, email, subject });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

/**
 * Update a teacher by ID
 * @param {Object} req - Express request object with params.id and body
 * @param {Object} res - Express response object
 */
async function updateTeacher(req, res) {
    const { id } = req.params;
    const { name, email, subject } = req.body;
    try {
        const [result] = await pool.query(
            'UPDATE Teachers SET name = ?, email = ?, subject = ? WHERE teacher_id = ?',
            [name, email, subject, id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Teacher not found' });
        res.json({ message: 'Teacher updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

/**
 * Delete a teacher by ID
 * @param {Object} req - Express request object with params.id
 * @param {Object} res - Express response object
 */
async function deleteTeacher(req, res) {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM Teachers WHERE teacher_id = ?', [id]);
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Teacher not found' });
        res.json({ message: 'Teacher deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { getAllTeachers, getTeacherById, createTeacher, updateTeacher, deleteTeacher };



