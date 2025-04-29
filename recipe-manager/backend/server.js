const express = require('express');
const app = express();
const recipeRoutes = require('./src/recipe.routes'); // importăm rutele pe care le-am creat
const cors = require('cors');

// Middleware-uri
app.use(cors());
app.use(express.json());

// Rute
app.use('/api', recipeRoutes);

// Pornim serverul
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serverul rulează pe portul ${PORT}`);
});
    