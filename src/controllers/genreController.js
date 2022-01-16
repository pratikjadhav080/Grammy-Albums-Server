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

    let albums;
    const sort = req.query.sort;
    const page = +req.query.page || 1;
    const size = +req.query.size || 2;
    const offset = (page-1)*size;
    
    let genre = await Genre.findById(req.params.id).populate('albumids').lean();

    if(sort){
        albums = genre.albumids.sort((a, b) => {
            let date1 = +a.dateofrelease.slice(0,4);
            let date2 = +b.dateofrelease.slice(0,4);

            // console.log(date1,date2)

            return sort=="1"? date1-date2:date2-date1;
        })
    }

    // console.log(albums)

    albums = genre.albumids.filter((e,i)=>{
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
