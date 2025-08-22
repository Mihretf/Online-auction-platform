const express = require('express');
const { 
  createUser, 
  getAllUsers, 
  getUserById,
  loginUser 
} = require('../controllers/userController');

const router = express.Router();

// @route   POST /api/users
// @desc    Create a new user
router.post('/', createUser);

// @route   GET /api/users
// @desc    Get all users
router.get('/', getAllUsers);

// @route   GET /api/users/:id
// @desc    Get user by ID
router.get('/:id', getUserById);

// @route   POST /api/users/login
// @desc    Login user and get JWT token
router.post('/login', loginUser);

module.exports = router;
