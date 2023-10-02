const express = require("express");
const app = express();
const db = require("../db/index");
const cors = require("cors");
const recipeRouter = require("./routes/recipeRouter");

app.use(cors());
app.use(express.json());

app.get("/recipes/:id", async (req, res) => {
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
});

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.use("/", recipeRouter);

module.exports = app;
