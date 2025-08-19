// chore: trivial role gate for demo; swap with real JWT later
function isAdmin(req, res, next) {
    const role = req.headers['role'];        // e.g., "admin"
    if (role === 'admin') return next();
    return res.status(403).json({ error: 'Access denied. Admins only.' });
  }
  
  module.exports = { isAdmin };
  