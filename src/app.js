// app.js
require("dotenv").config();
require("./db");
const express = require("express");
const authRoutes = require("./routes/auth");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// ROUTES
app.use("/auth", authRoutes);
const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

require("./error-handling")(app);

module.exports = app;
