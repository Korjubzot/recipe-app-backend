const db = require("../../db/index");
const queries = require("../queries");

const createRecipe = async (req, res) => {
  const { name, cuisine, cooking_time, servings, ingredients, instructions } = req.body;

  try {
    const {
      rows: [recipe],
    } = await db.query(queries.insertRecipe,
      [name, cuisine, cooking_time, servings, ingredients, instructions]
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

const getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
    const query = "SELECT * FROM recipes WHERE id = $1";
    const result = await db.query(query, [id]);

    if (!result.rows.length) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    const recipe = result.rows[0];

    res.status(200).json({ recipe });

  } catch (error) {
    console.error("Error retrieving recipe by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { createRecipe, getRecipe, getRecipeById };
