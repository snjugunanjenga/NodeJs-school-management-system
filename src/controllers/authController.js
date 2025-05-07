const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db'); // Assumes a MySQL connection pool

// Register is disabled in demo mode
const register = async (req, res) => {
    res.status(403).json({ error: 'Registration is disabled in demo mode' });
};

// Log in an existing user
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Find user by email
        const [users] = await pool.query('SELECT * FROM Users WHERE email = ?', [email]);
        if (users.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const user = users[0];

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Get additional user info based on role
        let userInfo = {};
        if (user.role === 'student') {
            const [students] = await pool.query('SELECT * FROM Students WHERE user_id = ?', [user.user_id]);
            if (students.length > 0) {
                userInfo = { ...students[0], role: 'student' };
            }
        } else if (user.role === 'teacher') {
            const [teachers] = await pool.query('SELECT * FROM Teachers WHERE user_id = ?', [user.user_id]);
            if (teachers.length > 0) {
                userInfo = { ...teachers[0], role: 'teacher' };
            }
        } else if (user.role === 'parent') {
            const [parents] = await pool.query('SELECT * FROM Parents WHERE user_id = ?', [user.user_id]);
            if (parents.length > 0) {
                const [students] = await pool.query('SELECT * FROM Students WHERE student_id = ?', [parents[0].student_id]);
                userInfo = { 
                    ...parents[0], 
                    role: 'parent',
                    student: students[0]
                };
            }
        } else if (user.role === 'admin') {
            userInfo = { role: 'admin' };
        }

        // Generate JWT token
        const token = jwt.sign(
            { 
                user_id: user.user_id, 
                role: user.role,
                ...userInfo
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ 
            token,
            user: {
                role: user.role,
                ...userInfo
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { register, login };