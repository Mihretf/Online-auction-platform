// middlewares/auth.js
function authMiddleware(req, res, next) {
    // Example: get user info from headers or token
    const user = req.headers['user']; // placeholder, replace with JWT decode in real app
    if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    req.user = JSON.parse(user); // attach user info to request
    next(); // continue to controller
}

module.exports = authMiddleware;
