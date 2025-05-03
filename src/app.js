// src/app.js
require('dotenv').config();       // Load environment variables (if you use any)
const express = require('express');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Health‑check endpoint
app.get('/', (req, res) => {
  res.send('OK');
});

// Mount student routes
const studentRoutes = require('./routes/studentRoutes');
app.use('/students', studentRoutes);

// Mount teacher routes
const teacherRoutes = require('./routes/teacherRoutes');
app.use('/teachers', teacherRoutes);

// Mount class routes
const classRoutes = require('./routes/classRoutes');
app.use('/classes', classRoutes);

// Mount enrollment routes
const enrollmentRoutes = require('./routes/enrollmentRoutes');
app.use('/enrollments', enrollmentRoutes);

module.exports = app;
