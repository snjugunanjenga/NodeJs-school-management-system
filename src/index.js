// src/index.js
require('dotenv').config();  // Load environment variables first
const serverless = require('serverless-http');
const app = require('./app');

const PORT = process.env.PORT || 3000;

// Error handling for uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    process.exit(1);
});

// Error handling for unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err);
    process.exit(1);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = serverless(app);