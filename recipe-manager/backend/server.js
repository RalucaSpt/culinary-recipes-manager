const express = require('express');
const cors = require('cors');
const app = express();

const recipeRoutes = require('./src/recipe.routes');

app.use(cors());
app.use(express.json());

// Această linie trebuie să existe exact așa:
app.use('/api/recipes', recipeRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serverul rulează pe portul ${PORT}`);
});
