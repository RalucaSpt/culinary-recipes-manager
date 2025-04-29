const express = require('express');
const cors = require('cors');
const session = require('express-session');
const authRoutes = require('./auth/auth.routes');

const app = express();

app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true
}));

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

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Backend with sessions is running!');
});

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

module.exports = app;
