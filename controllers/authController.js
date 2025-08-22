// *Handles registration, login, and checking current logged-in user. Manages password hashing and JWT tokens.

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Register user
const register = async (req, res) => {
  try {
    const { role, username, email, password, phone } = req.body;
    const bankStatement = req.file ? req.file.path : null;

    if (!role || !username || !email || !password) {
      return res
        .status(400)
        .json({ error: "Bad Request", message: "Missing required fields" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ error: "Conflict", message: "User with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      role,
      username,
      email,
      password: hashedPassword,
      phone,
      bankStatement,
    });

    res.status(201).json({
      message: "Registration submitted successfully. Awaiting admin approval",
      status: user.status,
    });
  } catch (err) {
    res.status(500).json({ error: "Server Error", message: err.message });
  }
};

// Login user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ error: "Unauthorized", message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ error: "Unauthorized", message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      message: "Login successful",
      token,
      role: user.role,
    });
  } catch (err) {
    res.status(500).json({ error: "Server Error", message: err.message });
  }
};

// Check user
const checkUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json({
      message: "Valid user",
      role: user.role,
      userId: user._id,
      username: user.username,
    });
  } catch (err) {
    res.status(500).json({ error: "Server Error", message: err.message });
  }
};

// 👇 Export all at bottom
module.exports = {
  register,
  login,
  checkUser,
};
