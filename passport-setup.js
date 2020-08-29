const passport = require('passport')
const GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config();
const db = require("./models");
const User = db.user

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET_KEY,
      callbackURL: "http://localhost:3000/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      User.findOrCreate({where: { googleId: profile.id }}, function (err, user) {
        return done(err, user);
      });
      // return done(null, profile);
    }
  )
);
