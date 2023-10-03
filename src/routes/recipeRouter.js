const express = require("express");
const router = express.Router();
const db = require("../../db/index");
const {
  createRecipe,
  getRecipe,
  getRecipeById,
  deleteRecipeById,
} = require("../controllers/recipeController");

router.post("/recipes", createRecipe);

router.get("/recipes", getRecipe);

router.get("/recipes/:id", getRecipeById);

router.delete("/recipes/:id", deleteRecipeById);

module.exports = router;
