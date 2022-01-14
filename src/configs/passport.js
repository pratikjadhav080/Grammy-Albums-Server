require("dotenv").config();
const passport = require('passport');
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const {v4: uuidV4} = require('uuid');
const User = require("../models/userModel");
const {newToken} = require("../controllers/authController")

passport.use(new GoogleStrategy({
    clientID:     process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.BACKEND_URL}/auth/google/callback`,
    userProfileURL: "https://**www**.googleapis.com/oauth2/v3/userinfo",
    passReqToCallback: true
  },
  async function(request, accessToken, refreshToken, profile, done) {
    const email = profile?._json?.email
    const name = profile?._json?.name

    console.log(email)
    let user;
    try { 
      user = await User.findOne({email}).lean().exec();

      if(!user) {
        user = await User.create({
          name:name,
          email: email,
          password: uuidV4()
        })
      }

      const token = newToken(user);
      return done(null, {user, token})

    } catch(err) {
      console.log("err", err)
    }
  }
));

module.exports = passport