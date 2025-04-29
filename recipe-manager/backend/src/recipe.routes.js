const express = require('express');
const router = express.Router();
const pool = require('../db/db'); // Importă conexiunea la baza de date

// Adaugă o rețetă nouă
router.post('/recipes', async (req, res) => {
  const { name, description, imageUrl, ingredients, instructions } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO recipes (title, description, imageUrl, ingredients, instructions)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [name, description, imageUrl, ingredients, instructions]
    );

    res.status(201).json(result.rows[0]); // Returnăm rețeta adăugată
  } catch (error) {
    console.error('Eroare la adăugare rețetă:', error);
    res.status(500).json({ error: 'Eroare la adăugare rețetă' });
  }
});

module.exports = router;
