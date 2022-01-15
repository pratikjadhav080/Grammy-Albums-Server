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

    const page = +req.query.page || 1;
    const size = +req.query.size || 2;
    const offset = (page-1)*size;
    
    let genre = await Genre.findById(req.params.id).populate('albumids').lean();

    let albums = genre.albumids.filter((e,i)=>{
        return i>offset-1
    }).filter((e,i)=>{
        return i<size
    })

    const totalPages = Math.ceil(genre.albumids.length/size)

    res.status(201).send({albums:albums, totalPages:totalPages});
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
