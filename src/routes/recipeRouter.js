const express = require("express");
const router = express.Router();
const db = require("../../db/index");
const { createRecipe, getRecipe, getRecipeById } = require("../controllers/recipeController");

router.post("/recipes", createRecipe);

router.get("/recipes", getRecipe);

router.get("/recipe/:id", getRecipeById);

module.exports = router;
