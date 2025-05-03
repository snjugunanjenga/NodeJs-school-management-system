// src/controllers/enrollmentController.js
const pool = require('../db');

/**
 * Get all enrollments
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function getAllEnrollments(req, res) {
    try {
        const [rows] = await pool.query('SELECT * FROM Enrollments');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

/**
 * Get an enrollment by ID
 * @param {Object} req - Express request object with params.id
 * @param {Object} res - Express response object
 */
async function getEnrollmentById(req, res) {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM Enrollments WHERE enrollment_id = ?', [id]);
        if (rows.length === 0) return res.status(404).json({ error: 'Enrollment not found' });
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

/**
 * Create a new enrollment
 * @param {Object} req - Express request object with body (student_id, class_id)
 * @param {Object} res - Express response object
 */
async function createEnrollment(req, res) {
    const { student_id, class_id } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO Enrollments (student_id, class_id) VALUES (?, ?)',
            [student_id, class_id]
        );
        res.status(201).json({ id: result.insertId, student_id, class_id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

/**
 * Update an enrollment by ID
 * @param {Object} req - Express request object with params.id and body
 * @param {Object} res - Express response object
 */
async function updateEnrollment(req, res) {
    const { id } = req.params;
    const { student_id, class_id } = req.body;
    try {
        const [result] = await pool.query(
            'UPDATE Enrollments SET student_id = ?, class_id = ? WHERE enrollment_id = ?',
            [student_id, class_id, id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Enrollment not found' });
        res.json({ message: 'Enrollment updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

/**
 * Delete an enrollment by ID
 * @param {Object} req - Express request object with params.id
 * @param {Object} res - Express response object
 */
async function deleteEnrollment(req, res) {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM Enrollments WHERE enrollment_id = ?', [id]);
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Enrollment not found' });
        res.json({ message: 'Enrollment deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { getAllEnrollments, getEnrollmentById, createEnrollment, updateEnrollment, deleteEnrollment };