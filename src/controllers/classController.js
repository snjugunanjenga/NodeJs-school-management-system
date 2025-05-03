// src/controllers/classController.js
const pool = require('../db');

/**
 * Get all classes
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function getAllClasses(req, res) {
    try {
        const [rows] = await pool.query('SELECT * FROM Classes');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

/**
 * Get a class by ID
 * @param {Object} req - Express request object with params.id
 * @param {Object} res - Express response object
 */
async function getClassById(req, res) {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM Classes WHERE class_id = ?', [id]);
        if (rows.length === 0) return res.status(404).json({ error: 'Class not found' });
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

/**
 * Create a new class
 * @param {Object} req - Express request object with body (name, teacher_id)
 * @param {Object} res - Express response object
 */
async function createClass(req, res) {
    const { name, teacher_id } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO Classes (name, teacher_id) VALUES (?, ?)',
            [name, teacher_id]
        );
        res.status(201).json({ id: result.insertId, name, teacher_id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

/**
 * Update a class by ID
 * @param {Object} req - Express request object with params.id and body
 * @param {Object} res - Express response object
 */
async function updateClass(req, res) {
    const { id } = req.params;
    const { name, teacher_id } = req.body;
    try {
        const [result] = await pool.query(
            'UPDATE Classes SET name = ?, teacher_id = ? WHERE class_id = ?',
            [name, teacher_id, id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Class not found' });
        res.json({ message: 'Class updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

/**
 * Delete a class by ID
 * @param {Object} req - Express request object with params.id
 * @param {Object} res - Express response object
 */
async function deleteClass(req, res) {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM Classes WHERE class_id = ?', [id]);
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Class not found' });
        res.json({ message: 'Class deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { getAllClasses, getClassById, createClass, updateClass, deleteClass };