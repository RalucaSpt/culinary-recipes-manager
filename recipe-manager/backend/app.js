const express = require('express');
const session = require('express-session');
const authRoutes = require('./auth/auth.routes');
const cors = require('cors');

const app = express();

app.use(express.json());

app.use(session({
  secret: 'super_secret_key', 
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 1000 * 60 * 60
  }
}));

// Updated CORS configuration
app.use(cors({
  origin: 'http://localhost:4200', // Explicitly allow the Angular frontend
  credentials: true, // Allow cookies and credentials
}));

// Handle preflight requests globally
app.options('*', cors({
  origin: 'http://localhost:4200',
  credentials: true,
}));

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Backend with sessions is running!');
});

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

module.exports = app;
