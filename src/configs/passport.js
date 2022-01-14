require("dotenv").config();
const passport = require('passport');
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const {v4: uuidV4} = require('uuid');
const Artist = require("../models/artistModel");
const {newToken} = require("../controllers/artistController")

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
    let artist;
    try { 
      artist = await Artist.findOne({email}).lean().exec();

      if(!artist) {
        artist = await Artist.create({
          name:name,
          email: email,
          password: uuidV4()
        })
      }

      const token = newToken(artist);
      return done(null, {artist, token})

    } catch(err) {
      console.log("err", err)
    }
  }
));

module.exports = passport