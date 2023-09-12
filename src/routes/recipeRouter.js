const express = require("express");
const router = express.Router();
const { createRecipe, getRecipe } = require("../controllers/recipeController");

router.post("/recipes", createRecipe);

router.get("/recipes", getRecipe);

module.exports = router;
