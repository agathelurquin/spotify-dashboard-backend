// routes/auth.js
const express = require("express");
const passport = require("passport");
const router = express.Router();

// Initiate Spotify login
router.get(
  "/spotify",
  passport.authenticate("spotify", {
    scope: [
      "user-read-email",
      "user-read-private",
      "playlist-read-private",
      "playlist-read-collaborative",
    ],
  })
);

// Handle callback from Spotify
router.get(
  "/spotify/callback",
  passport.authenticate("spotify", {
    failureRedirect: "/login",
    session: false,
  }),
  (_, res) => {
    // Successful authentication
    res.redirect("/api"); // Redirect to frontend
  }
);

// Log out user
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
