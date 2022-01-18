const { default: axios } = require("axios");
const express = require("express");
const Album = require("../models/albumModel");
const router = express.Router();

router.post("/", async (req, res) => {
    let album = await Album.create(req.body);

    axios.patch(`http://localhost:7765/artists/newAlbum/${req.body.artistid}`,{id:album._id})
    .then(res => {
        console.log("here")
    })
    .catch(err => {
        console.log("Error", err);
    })

    axios.patch(`http://localhost:7765/genres/addalbum/${req.body.genreid}`,{id:album._id})
    .then(res => {
        console.log("here")
    })
    .catch(err => {
        console.log("Error", err);
    })


    res.status(201).send(album);
});

router.get("/", async (req, res) => {

    let albums;
    const sort = req.query.sort;
    const page = +req.query.page || 1;
    const size = +req.query.size || 2;
    const offset = (page-1)*size;

    if(sort){
        albums = await Album.find().sort({dateofrelease: +sort}).skip(offset).limit(size).populate(['artistid','genreid','songids']).lean();
    }else{
        albums = await Album.find().skip(offset).limit(size).populate(['artistid','genreid','songids']).lean();
    }

    const totalUserCount = await Album.find().countDocuments();
    const totalPages = Math.ceil(totalUserCount/size)

    res.status(201).send({albums:albums, totalPages:totalPages});
});

router.get("/searchbyname", async (req, res) => {

    let album = await Album.find({albumname: {$regex: req.query.search, $options: 'i'}}).lean().exec();
    res.status(201).send(album);
});


router.get("/:id", async (req, res) => {

    let album = await Album.findById(req.params.id).populate(['artistid','genreid','songids']).lean();
    res.status(201).send(album);
});

router.patch("/newSong/:id", async (req, res) => {
    let album = await Album.findByIdAndUpdate(req.params.id, { $addToSet: { songids: req.body.id } }).lean().exec();
    res.status(200).send(album);
});

router.delete("/:id", async (req, res) => {
    let album = await Album.deleteOne({ _id: req.params.id });
    res.status(200).send(album);
});

module.exports = router;
