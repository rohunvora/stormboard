const passport = require('passport')
const GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config();
const db = require("./models");
const User = db.user

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (id, done) {
  User.findOne({
    where: {googleId: id.toString()}
  }).then((user) => {
    done(null, user)
  })
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET_KEY
    },
    function (accessToken, refreshToken, profile, done) {
      User.findOrCreate({
        where: {
          googleId: profile.id.toString(),
          firstName: profile._json.given_name,
          lastName: profile._json.family_name,
          email: profile._json.email,
        },
      }).then((user) => {
        return done(null, user);
      });
    }
  )
);
