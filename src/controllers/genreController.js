const express = require("express");
const Genre = require("../models/genreModel");
const router = express.Router();

router.post("/", async (req, res) => {
    let genre = await Genre.create(req.body);
    res.status(201).send(genre);
});

router.get("/", async (req, res) => {
    let genre = await Genre.find().populate('albumids').lean();
    res.status(201).send(genre);
});

router.get("/:id", async (req, res) => {
    let genre = await Genre.findById(req.params.id).lean();
    res.status(201).send(genre);
});

router.patch("/:id", async (req, res) => {
    let genre = await Genre.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).send(genre);
});

router.delete("/:id", async (req, res) => {
    let genre = await Genre.deleteOne({ _id: req.params.id });
    res.status(200).send(genre);
});

module.exports = router;
