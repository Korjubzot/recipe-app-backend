const db = require("../../db/index");

const createRecipe = async (req, res) => {
  const { name, cuisine } = req.body;

  try {
    const {
      rows: [recipe],
    } = await db.query(
      "INSERT INTO Recipes (name, cuisine) VALUES ($1, $2) RETURNING *",
      [name, cuisine]
    );
    res.status(201).json(recipe);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const getRecipe = async (_, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM Recipes");
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

module.exports = { createRecipe, getRecipe };
