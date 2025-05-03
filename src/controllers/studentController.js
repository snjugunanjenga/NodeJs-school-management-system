// src/controllers/studentController.js
const pool = require('../db');

/**
 * Get all students
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function getAllStudents(req, res) {
    try {
        const [rows] = await pool.query('SELECT * FROM Students');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

/**
 * Get a student by ID
 * @param {Object} req - Express request object with params.id
 * @param {Object} res - Express response object
 */
async function getStudentById(req, res) {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM Students WHERE student_id = ?', [id]);
        if (rows.length === 0) return res.status(404).json({ error: 'Student not found' });
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

/**
 * Create a new student
 * @param {Object} req - Express request object with body (name, email, date_of_birth)
 * @param {Object} res - Express response object
 */
async function createStudent(req, res) {
    const { name, email, date_of_birth } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO Students (name, email, date_of_birth) VALUES (?, ?, ?)',
            [name, email, date_of_birth]
        );
        res.status(201).json({ id: result.insertId, name, email, date_of_birth });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

/**
 * Update a student by ID
 * @param {Object} req - Express request object with params.id and body
 * @param {Object} res - Express response object
 */
async function updateStudent(req, res) {
    const { id } = req.params;
    const { name, email, date_of_birth } = req.body;
    try {
        const [result] = await pool.query(
            'UPDATE Students SET name = ?, email = ?, date_of_birth = ? WHERE student_id = ?',
            [name, email, date_of_birth, id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Student not found' });
        res.json({ message: 'Student updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

/**
 * Delete a student by ID
 * @param {Object} req - Express request object with params.id
 * @param {Object} res - Express response object
 */
async function deleteStudent(req, res) {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM Students WHERE student_id = ?', [id]);
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Student not found' });
        res.json({ message: 'Student deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { getAllStudents, getStudentById, createStudent, updateStudent, deleteStudent };