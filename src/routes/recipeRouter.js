const express = require("express");
const router = express.Router();
const { createRecipe, getRecipe } = require("../controllers/recipeController");

router.post("/", createRecipe);

router.get("/", getRecipe);

module.exports = router;
