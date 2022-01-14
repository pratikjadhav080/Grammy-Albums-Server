const jwt = require("jsonwebtoken")
require("dotenv").config();

function verifyToken(token) {
    return new Promise(function(resolve, reject) {
        jwt.verify(token, process.env.JWT_SECRET_KEY, function(err, artist) {
            if(err) return reject(err);

            return resolve(artist)
        })
    })
}

async function authenticate (req, res, next) {
    // If we have received the bearer token in the header
    const bearerToken = req.headers.authorization;

    // if not we will throw an error
    if (! bearerToken || ! bearerToken.startsWith('Bearer ')) return res.status(400).send({message: "Please provide a bearer token"});

    // else we will extract the artist from the token
    const token = bearerToken.split(" ")[1]

    try {
        const {artist} = await verifyToken(token)
        console.log("artist", artist);
        
        // else we will attach the artist to the req
        req.artist = artist;
    
        // return next
        return next();
    } catch(err) {
        return res.status(400).send({message: "Please provide a valid bearer token"});
    }
}

module.exports = authenticate;