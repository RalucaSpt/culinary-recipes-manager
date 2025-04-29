const express = require('express');
const { register, login } = require('./auth.service');

const router = express.Router();

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await register(email, password);
    res.status(201).json({ message: 'User registered successfully', user: { id: user.id, email: user.email } });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message || 'Internal server error' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await login(email, password);

    req.session.userId = user.id; // <<< Aici salvăm user-ul logat
    res.status(200).json({ message: 'Login successful', user: { id: user.id, email: user.email } });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message || 'Internal server error' });
  }
});

// GET /api/auth/logout
router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed' });
    }
    res.clearCookie('connect.sid');
    res.json({ message: 'Logged out successfully' });
  });
});

// GET /api/auth/me
router.get('/me', (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: 'Not authenticated' });
  }
  res.json({ userId: req.session.userId });
});

module.exports = router;
