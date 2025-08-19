const express = require('express');
const router = express.Router();

// POST /api/users/register
router.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  // simple validation
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // For now, just return a success message
  res.status(201).json({ message: 'User registered successfully', user: { name, email } });
});

module.exports = router;
