const express = require("express");
const multer = require("multer");
const { register, login, checkUser } = require("../controllers/authController");
const {authMiddleware} = require("../middleware/authMiddleware");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Register
router.post("/register", upload.single("bankStatement"), register);

// Login
router.post("/login", login);

// Check User
router.get("/checkUser", authMiddleware, checkUser);

module.exports = router;
