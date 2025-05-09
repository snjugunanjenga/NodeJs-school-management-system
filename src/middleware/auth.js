const { expressjwt: jwt } = require('express-jwt');

const authenticateToken = jwt({
    secret: process.env.JWT_SECRET || 'your_jwt_secret_key_here',
    algorithms: ['HS256'],
    getToken: (req) => req.headers.authorization?.split(' ')[1] // Extracts 'Bearer <token>'
});

module.exports = { authenticateToken };