// Create web server

// Import modules
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

// Create server
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Read JSON file
const comments = JSON.parse(fs.readFileSync("comments.json"));

// GET all comments
app.get("/comments", (req, res) => {
  res.json(comments);
});

// GET single comment
app.get("/comments/:id", (req, res) => {
  const comment = comments.find((comment) => comment.id === req.params.id);
  res.json(comment);
});

// POST new comment
app.post("/comments", (req, res) => {
  const comment = {
    id: uuidv4(),
    name: req.body.name,
    comment: req.body.comment,
  };
  comments.push(comment);
  fs.writeFileSync("comments.json", JSON.stringify(comments));
  res.json(comments);
});

// PUT comment
app.put("/comments/:id", (req, res) => {
  const comment = comments.find((comment) => comment.id === req.params.id);
  comment.name = req.body.name;
  comment.comment = req.body.comment;
  fs.writeFileSync("comments.json", JSON.stringify(comments));
  res.json(comments);
});

// DELETE comment
app.delete("/comments/:id", (req, res) => {
  const index = comments.findIndex((comment) => comment.id === req.params.id);
  comments.splice(index, 1);
  fs.writeFileSync("comments.json", JSON.stringify(comments));
  res.json(comments);
});

// GET all comments
app.get("/comments", (req, res) => {
  res.json(comments);
});

// Create server
app.listen("3000", () => {
  console.log("Server started");
});