const express = require("express");
const app = express();
const db = require("../db/index");
const recipeRouter = require("./routes/recipeRouter");

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.use("/", recipeRouter);

module.exports = app;
