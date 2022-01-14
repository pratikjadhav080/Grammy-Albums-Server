const express = require("express");
const router = express.Router();
const Reply = require("../models/replyModel");
const axios = require("axios").default;

router.post("/", async (req, res) => {

    let reply = await Reply.create(req.body);

    //axios patch - it required field that needs to be chanagd

    console.log("hereeee",req.body.postid)

    axios
    .patch(`${process.env.BACKEND_URL}/posts/increase/${req.body.postid}`, { replycount:1 })
    .then(res => {
        console.log("data", res.data)
    })
    .catch(err => {
        console.log("Error", err);
    })

    res.status(201).send({ reply });
});

router.get("/", async (req, res) => {

    let replies = await Reply.find().populate("postid").lean();
    res.status(201).send({ replies });
});


router.get("/:id", async (req, res) => {

    let reply = await Reply.findById(req.params.id).populate("postid").lean();
    res.status(201).send({ reply });
});

router.get("/post/:id", async (req, res) => {

    let reply = await Reply.find({ postid: req.params.id }).populate("postid").lean();
    res.status(201).send({ reply });
});


router.patch("/:id", async (req, res) => {

    let reply = await Reply.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).send({ reply });
});

router.delete("/:id", async (req, res) => {

    let deletedreply = await Reply.deleteOne({ _id: req.params.id });
    res.status(200).send({ deletedreply });
});

module.exports = router;
