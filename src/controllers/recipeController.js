const db = require("../../db/index");
const queries = require("../queries");

const createRecipe = async (req, res) => {
  const { name, cuisine, cooking_time, servings, steps } = req.body;

  try {
    const sql = `
      INSERT INTO recipes (name, cuisine, cooking_time, servings, steps)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;

    const values = [name, cuisine, cooking_time, servings, steps];

    const { rows } = await db.query(sql, values);

    if (rows.length === 0) {
      return res.status(500).json({ error: "Recipe creation failed" });
    }

    const recipe = rows[0];
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

const getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
    const query = "SELECT * FROM recipes WHERE id = $1";
    const result = await db.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    const recipe = result.rows[0];
    res.status(200).json(recipe);
  } catch (error) {
    console.error("Error retrieving recipe by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { createRecipe, getRecipe, getRecipeById };
