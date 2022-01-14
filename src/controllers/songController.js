const express = require("express");
const router = express.Router();
const Song = require("../models/songModel");

router.post("/", async (req, res) => {
    let song = await Song.create(req.body);
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
