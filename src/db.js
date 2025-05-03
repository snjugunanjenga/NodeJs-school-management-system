// Load environment variables from .env file
require('dotenv').config();

// Import mysql2/promise for promise-based MySQL interactions
const mysql = require('mysql2/promise');

// Create a connection pool using environment variables
const pool = mysql.createPool({
    host: process.env.DB_HOST,       // Database host (e.g., localhost)
    user: process.env.DB_USER,       // Database username
    password: process.env.DB_PASS,   // Database password
    database: process.env.DB_NAME,   // Database name
    waitForConnections: true,        // Wait for connections if pool is exhausted
    connectionLimit: 10,             // Maximum number of connections in the pool
    queueLimit: 0                    // No limit on queued connection requests
});

// Export the pool for use in other modules
module.exports = pool;