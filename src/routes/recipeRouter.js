const express = require("express");
const router = express.Router();
const db = require("../../db/index");
const { createRecipe, getRecipe } = require("../controllers/recipeController");

router.post("/recipes", createRecipe);

router.get("/recipes", getRecipe);

router.get("/recipes/:id", async (req, res) => {
  try {
    const recipeId = req.params.id;

    const recipe = await db.getRecipeById(recipeId);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.json(recipe);
  } catch (error) {
    console.error("Error fetching recipe:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
