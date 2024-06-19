const express = require("express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const session = require("express-session");
const passport = require("./passport");

// Middleware configuration
module.exports = (app) => {
  // Because this will be hosted on a server that will accept requests from outside and it will be hosted ona server with a `proxy`, express needs to know that it should trust that setting.
  // Services like Fly use something called a proxy and you need to add this to your server
  app.set("trust proxy", 1);

  // controls a very specific header to pass headers from the frontend
  app.use(
    cors({
      origin: [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        process.env.ORIGIN,
      ],
    })
  );

  // In development environment the app logs
  app.use(logger("dev"));

  // To have access to `body` property in the request
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());

  // Session middleware
  app.use(
    session({
      secret: "your_secret_key",
      resave: true,
      saveUninitialized: true,
    })
  );

  // Passport initialization
  app.use(passport.initialize());
  app.use(passport.session());
};
