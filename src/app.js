// app.js
require("dotenv").config();
require("./db");
const express = require("express");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// ROUTES
app.get("/", (req, res) => {
  console.log(req);
});

require("./error-handling")(app);

module.exports = app;
