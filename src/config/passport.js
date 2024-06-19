// config/passport.js
const passport = require("passport");
const SpotifyStrategy = require("passport-spotify").Strategy;
const User = require("../models/User.model");

passport.use(
  new SpotifyStrategy(
    {
      clientID: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      callbackURL: process.env.SPOTIFY_REDIRECT_URI,
    },
    async (accessToken, refreshToken, expires_in, profile, done) => {
      try {
        let user = await User.findOne({ spotifyId: profile.id });

        if (!user) {
          console.log(
            "******************************************************************",
            profile
          );

          // Create a new user in your database based on Spotify profile data
          user = await User.create({
            spotifyId: profile.id,
            displayName: profile.displayName,
            profileUrl: profile.profileUrl,
            accessToken,
            refreshToken,
          });
        } else {
          // Update access and refresh tokens if user exists
          user.accessToken = accessToken;
          user.refreshToken = refreshToken;
          await user.save();
        }

        return done(null, user);
      } catch (error) {
        console.error("Passport Strategy Error:", error);
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

module.exports = passport;
