const pool = require('../db');
const bcrypt = require('bcrypt');

// Get logged-in user's profile
const getProfile = async (req, res) => {
    const { user_id, role } = req.auth;
    try {
        let profile;
        if (role === 'student') {
            [profile] = await pool.query('SELECT * FROM Students WHERE user_id = ?', [user_id]);
        } else if (role === 'teacher') {
            [profile] = await pool.query('SELECT * FROM Teachers WHERE user_id = ?', [user_id]);
        }
        if (!profile || profile.length === 0) {
            return res.status(404).json({ error: 'Profile not found' });
        }
        res.json(profile[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update logged-in user's profile
const updateProfile = async (req, res) => {
    const { user_id, role } = req.auth;
    const { name, email, password } = req.body;
    try {
        const connection = await pool.getConnection();
        await connection.beginTransaction();

        // Update password in Users table if provided
        if (password) {
            const passwordHash = await bcrypt.hash(password, 10);
            await connection.query(
                'UPDATE Users SET password_hash = ? WHERE user_id = ?',
                [passwordHash, user_id]
            );
        }

        // Update email in Users table
        if (email) {
            await connection.query(
                'UPDATE Users SET email = ? WHERE user_id = ?',
                [email, user_id]
            );
        }

        // Update profile based on role
        if (role === 'student') {
            await connection.query(
                'UPDATE Students SET name = ?, email = ? WHERE user_id = ?',
                [name, email, user_id]
            );
        } else if (role === 'teacher') {
            await connection.query(
                'UPDATE Teachers SET name = ?, email = ? WHERE user_id = ?',
                [name, email, user_id]
            );
        }

        await connection.commit();
        connection.release();
        res.json({ message: 'Profile updated successfully' });
    } catch (error) {
        await connection.rollback();
        connection.release();
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getProfile, updateProfile };