const express = require('express');
const cors = require('cors');
const session = require('express-session');
const app = express();

const recipeRoutes = require('./src/recipe.routes');
const authRoutes = require('./auth/auth.routes');

app.use(cors({
  origin: ['http://localhost:4200', 'http://localhost:8081'], 
  credentials: true,
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

app.use('/api/recipes', recipeRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serverul rulează pe portul ${PORT}`);
});
    