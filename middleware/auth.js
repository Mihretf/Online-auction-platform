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
