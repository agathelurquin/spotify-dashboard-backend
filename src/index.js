// app.js
const express = require("express");
const logger = require("morgan");
const connectDB = require("./config/db");

const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());

// ROUTES
app.get("/", (req, res) => {
  console.log(req);
});

app.listen(3000, () => console.log("App listening on port 3000!"));

connectDB();
