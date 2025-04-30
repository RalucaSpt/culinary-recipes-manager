const express = require('express');
const session = require('express-session');
const cors = require('cors');
const authRoutes = require('./auth/auth.routes');

const app = express();

// 1. CORS - trebuie PRIMUL!
app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true
}));

// 2. express-session
app.use(session({
  secret: 'super_secret_key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,        // true doar pe HTTPS
    httpOnly: true,
    sameSite: 'lax',      // pentru a permite în mod explicit cookie cross-site (localhost:4200 → 3000)
    maxAge: 1000 * 60 * 60
  }
}));

// 3. express.json
app.use(express.json());

// 4. Rute
app.use('/api/auth', authRoutes);

module.exports = app;
