const express = require('express');
const router = express.Router();
const pool = require('../db/db');

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

// Ruta POST /api/recipes
router.post('/', async (req, res) => {
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
  
module.exports = router;
