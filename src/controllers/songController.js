const { default: axios } = require("axios");
const express = require("express");
const router = express.Router();
const Song = require("../models/songModel");

router.post("/", async (req, res) => {

    console.log(req.body)

    let song = await Song.create(req.body);

    axios.patch(`http://localhost:7765/albums/newSong/${req.body.albumid}`,{id:song._id})
    .then(res => {
        console.log("here")
    })
    .catch(err => {
        console.log("Error", err);
    })

    res.status(201).send(song);
});

router.get("/", async (req, res) => {
    let song = await Song.find().populate(['artistid','albumid']).lean();
    res.status(201).send(song);
});


router.get("/:id", async (req, res) => {
    let song = await Song.findById(req.params.id).populate(['artistid','albumid']).lean();
    res.status(201).send(song);
});

router.patch("/:id", async (req, res) => {
    let song = await Song.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).send(song);
});

router.delete("/:id", async (req, res) => {
    let song = await Song.deleteOne({ _id: req.params.id });
    res.status(200).send(song);
});

module.exports = router;
