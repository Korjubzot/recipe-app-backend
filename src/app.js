const express = require("express");
const app = express();
const db = require("../db/index");
const recipeRouter = require("./routes/recipeRouter");

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.post("/recipes", async (req, res) => {
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
});
// app.use("/", recipeRouter);

module.exports = app;
