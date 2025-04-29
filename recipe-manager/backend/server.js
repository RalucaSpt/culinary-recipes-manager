const express = require('express');
const cors = require('cors');
const recipeRoutes = require('./src/recipe.routes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/recipes', recipeRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serverul rulează pe portul ${PORT}`);
});
    