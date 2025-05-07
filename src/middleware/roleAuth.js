const roleAuth = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.auth) {
            return res.status(401).json({ error: 'Authentication required' });
        }

        if (!allowedRoles.includes(req.auth.role)) {
            return res.status(403).json({ error: 'Insufficient permissions' });
        }

        next();
    };
};

module.exports = roleAuth; 