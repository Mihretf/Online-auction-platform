const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized", message: "Invalid or missing authentication token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, role }
    next();
  } catch (err) {
    return res.status(401).json({ error: "Unauthorized", message: "Invalid or expired token" });
  }
};

function isAdmin(req, res, next) {
  const role = req.user.role; // e.g., "admin"
  if (role === 'admin') return next();
  return res.status(403).json({ error: 'Access denied. Admins only.' });
}

module.exports = { authMiddleware, isAdmin };
