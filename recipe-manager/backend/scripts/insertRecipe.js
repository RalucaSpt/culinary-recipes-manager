const pool = require('../db/db'); // conectare DB

async function insertRecipe() {
  try {
    const result = await pool.query(
      `INSERT INTO recipes (title, description, imageurl, ingredients, instructions) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [
        'Pizza Margherita',                       // title
        'Rețetă simplă de pizza cu roșii și mozzarella', // description
        'https://linkcatreimagine.com/pizza.jpg',  // imageUrl
        ['100g Făină', '50g Mozzarella', 'Roșii'], // ingredients (listă)
        'Se amestecă făina, se pune sosul, mozzarella și se coace 15 min.' // instructions
      ]
    );

    console.log('Rețetă adăugată:', result.rows[0]);
  } catch (error) {
    console.error('Eroare la adăugare rețetă:', error);
  } finally {
    await pool.end(); // închidem conexiunea
  }
}

insertRecipe();
