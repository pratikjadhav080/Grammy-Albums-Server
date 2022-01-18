const express = require('express');
const app = express();
const passport = require("./configs/passport")
const session = require('express-session');
const cors = require('cors')

//add controllers here
const {register, login,getAllArtist,updateArtistData,getArtistData,addAlbumtolist} = require("./controllers/artistController")
const albumController = require("./controllers/albumController");
const genreController = require("./controllers/genreController");
const songController = require("./controllers/songController");

app.use(cors({origin: process.env.FRONTEND_URL, credentials: true}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
    session({
        secret: 'secretcode',
        resave: true,
        saveUninitialized: true,
    })
)
app.use(passport.initialize());
app.use(passport.session());
app.use("/albums", albumController);
app.use("/genres", genreController);
app.use("/songs", songController);
app.get("/artists", getAllArtist);
app.get("/artists/:id", getArtistData);
app.patch("/artists/:id", updateArtistData);
app.patch("/artists/newAlbum/:artistid", addAlbumtolist);

passport.serializeUser(function({artist, token}, done) {
    done(null, {artist, token});
});
  
passport.deserializeUser(function({artist, token}, done) {
    done(null, {artist, token});
});


//---------------google auth----------//

app.get("/auth/google/failure", function(req, res) {
    return res.send("Something went wrong");
})

app.get('/auth/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

app.get( '/auth/google/callback',
    passport.authenticate( 'google', {
        failureRedirect: '/auth/google/failure'
}), function(req, res) {
    res.redirect(`${process.env.FRONTEND_URL}/blueaura`)
});


//-----------------Normal Login---------------//

app.post("/register", register);
app.post("/login", login);

app.get('/profile',isLoggedIn,(req, res) => {
    res.send(req.artist);
})

app.get("/",(req,res)=>{
    res.send("Hello")
})

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect(process.env.FRONTEND_URL);
}

module.exports = app;