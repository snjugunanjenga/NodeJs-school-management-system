const { expressjwt: jwt } = require('express-jwt');

const authMiddleware = jwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
    getToken: (req) => req.headers.authorization?.split(' ')[1] // Extracts 'Bearer <token>'
});

module.exports = authMiddleware;