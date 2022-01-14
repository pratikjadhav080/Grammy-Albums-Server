const express = require("express");
const Album = require("../models/albumModel");
const router = express.Router();

router.post("/", async (req, res) => {
    let album = await Album.create(req.body);
    res.status(201).send(album);
});

router.get("/", async (req, res) => {
    let albums = await Album.find().populate(['artistid','genreid','songids']).lean();
    res.status(201).send(albums);
});

router.get("/:id", async (req, res) => {
    let album = await Album.findById(req.params.id).populate(['artistid','genreid','songids']).lean();
    res.status(201).send(album);
});

router.patch("/:id", async (req, res) => {
    let album = await Album.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).send(album);
});


router.delete("/:id", async (req, res) => {
    let album = await Album.deleteOne({ _id: req.params.id });
    res.status(200).send(album);
});

module.exports = router;
