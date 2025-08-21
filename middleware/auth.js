// chore: trivial role gate for demo; swap with real JWT later

  
  
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
function isAdmin(req, res, next) {
    const role = req.headers['role'];        // e.g., "admin"
    if (role === 'admin') return next();
    return res.status(403).json({ error: 'Access denied. Admins only.' });
  }
module.exports = authMiddleware;
 module.exports = { isAdmin };

