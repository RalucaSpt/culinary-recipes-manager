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

module.exports = router;
