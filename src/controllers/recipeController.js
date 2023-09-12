const db = require("../../db/index");

const createRecipe = async (req, res) => {
  const { name, cuisine } = req.body;

  try {
    const {
      rows: [recipe],
    } = await db.query(
      "INSERT INTO recipes (name, cuisine) VALUES ($1, $2) RETURNING *",
      [name, cuisine]
    );
    res.status(201).json(recipe);
  } catch (err) {
    console.error("Error creating recipe:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getRecipe = async (_, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM recipes");
    res.status(200).json(rows);
  } catch (err) {
    console.error("Error fetching recipes:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { createRecipe, getRecipe };
