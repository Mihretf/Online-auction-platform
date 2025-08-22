<<<<<<< HEAD
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

module.exports = async function requireAuth(req, res, next) {
  try {
    const auth = req.headers.authorization || "";
    const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;
    if (!token) return res.status(401).json({ error: "Unauthorized", message: "Missing token" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) return res.status(401).json({ error: "Unauthorized", message: "User not found" });

    req.user = { id: user._id, role: user.role, verified: !!user.verified };
    next();
  } catch (err) {
    return res.status(401).json({ error: "Unauthorized", message: err.message });
  }
};
=======
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
>>>>>>> 142e4870217515e54b80e8285df7168206c5cb4f
