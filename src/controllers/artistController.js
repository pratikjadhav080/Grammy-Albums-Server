const jwt = require("jsonwebtoken");
const Artist = require("../models/artistModel");
require("dotenv").config();

const newToken = (artist) => {
    return jwt.sign({artist}, process.env.JWT_SECRET_KEY);
}

const register = async (req, res) => {

    let artist;
    try {
        // First we check if artist with same email already exists
        artist = await Artist.findOne({email: req.body.email})

        // if yes then we throw an error that email already exists
        if (artist) return res.status(400).send({message: "Please check your email and password"});
        
        // else we will create the artist with the email and password 
        // but before saving the password we need to hash it
        artist = await Artist.create(req.body);

        // we will create a token
        const token = newToken(artist)

        // we will send the token to the frontend
        return res.status(200).send({artist, token});

    } catch (err) {
        return res.status(500).send({message: "Sorry for inconvenience please try again later"});
    }
}

const login = async (req, res) => {
    
    console.log("here")
    try {
        // First we will check if artist with same email already exists
        let artist = await Artist.findOne({email: req.body.email}).populate('albumids');

        // if not exists we throw an error
        if(! artist) return res.status(400).send({message: "Please check your email and password"});
    
        // if it exists then we match the password
        let match = artist.checkPassword(req.body.password);
    
        // if not match then we throw an error
        if(! match) return res.status(400).send({message: "Please check your email and password"});
    
        // we will create a token
        const token = newToken(artist)
        
        // we will send the token to the frontend
        return res.status(200).send({artist, token});

    } catch (err) {
        return res.status(500).send({message: "Sorry for inconvenience please try again later"});   
    }
}


const getAllArtist = async (req, res)=>{
    let artists = await Artist.find({}).populate({
        path: 'albumids',
        populate: { path: 'songids' }
      }
    );
    return res.status(200).send(artists);
}

const updateArtistData = async (req, res)=>{
    console.log(req.body)
    let artist = await Artist.findByIdAndUpdate(req.params.id, req.body, { new: true }).lean().exec();
    return res.status(200).send(artist);
}

const getArtistData = async (req, res)=>{
    let artist = await Artist.findById(req.params.id).populate({
        path: 'albumids',
        populate: { path: 'songids' }
      }
    ).lean().exec();
    return res.status(200).send(artist);
}

module.exports = {register, login,newToken,getAllArtist,updateArtistData,getArtistData}