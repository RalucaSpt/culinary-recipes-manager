const express = require('express');
const router = express.Router();
const pool = require('../db/db');
const isAuthenticated = require('../auth/auth.middleware');

// Ruta GET /api/recipes
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM recipes ORDER BY id DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Eroare la GET /api/recipes:', error);
    res.status(500).json({ error: 'Eroare la încărcarea rețetelor' });
  }
});

// Ruta GET /api/recipes/:id
router.get('/:id', isAuthenticated, async (req, res) => {
  console.log('Testing GET /api/recipes/:id', req.params.id); // Debugging line
  const recipeId = parseInt(req.params.id, 10);
  if (isNaN(recipeId)) {
    return res.status(400).json({ error: 'ID invalid' });
  }

  try {
    const result = await pool.query('SELECT * FROM recipes WHERE id = $1', [recipeId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Rețeta nu a fost găsită' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Eroare la GET /api/recipes/:id:', error);
    res.status(500).json({ error: 'Eroare la încărcarea rețetei' });
  }
});

// Ruta POST /api/recipes
router.post('/', isAuthenticated, async (req, res) => {
    try {
      const { title, description, ingredients, instructions, imageUrl } = req.body;
  
      const result = await pool.query(
        'INSERT INTO recipes (title, description, ingredients, instructions, imageurl) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [title, description, ingredients, instructions, imageUrl]
      );
  
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('Eroare la POST /api/recipes:', error);
      res.status(500).json({ error: 'Eroare la salvarea rețetei' });
    }
  });

// Ruta DELETE /api/recipes/:id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM recipes WHERE id = $1', [id]);
    res.sendStatus(204); // No Content
  } catch (error) {
    console.error('Eroare la DELETE /api/recipes/:id:', error);
    res.status(500).json({ error: 'Eroare la ștergerea rețetei' });
  }
});

module.exports = router;
