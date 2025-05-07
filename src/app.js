// src/app.js
require('dotenv').config();       // Load environment variables (if you use any)
const express = require('express');
const app = express();

// Import routes
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const parentRoutes = require('./routes/parentRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Middleware
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/student', studentRoutes);
app.use('/teacher', teacherRoutes);
app.use('/parent', parentRoutes);
app.use('/admin', adminRoutes);

// Health‑check endpoint
app.get('/', (req, res) => {
  res.send('OK');
});

// Mount class routes
const classRoutes = require('./routes/classRoutes');
app.use('/classes', classRoutes);

// Mount enrollment routes
const enrollmentRoutes = require('./routes/enrollmentRoutes');
app.use('/enrollments', enrollmentRoutes);

// Mount Updateprofile routes
const profileRoutes = require('./routes/profileRoutes');
app.use('/profile', profileRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = app;



