const express = require("express");
const router = express.Router();
const Post = require("../models/postModel");

router.post("/", async (req, res) => {

    let post = await Post.create(req.body);
    res.status(201).send({ post });
});

router.get("/", async (req, res) => {

    let post = await Post.find().populate("category").lean();
    res.status(201).send({ post });
});


router.get("/:id", async (req, res) => {

    let post = await Post.findById(req.params.id).populate("category").lean();
    res.status(201).send({ post });
});

router.get("/category/:id", async (req, res) => {

    let post = await Post.find({ category: req.params.id }).populate("category").lean();
    res.status(201).send({ post });
});

router.patch("/:id", async (req, res) => {

    let post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).send({ post });
});

router.patch("/increase/:id", async (req, res) => {

    let post = await Post.findByIdAndUpdate(req.params.id, { $inc: { replycount: 1 } }, { new: true });
    res.status(200).send({ post });
});

router.patch("/increaselikes/:id", async (req, res) => {

    let post = await Post.findByIdAndUpdate(req.params.id, { $inc: { likescount: 1 } }, { new: true });
    res.status(200).send({ post });
});

router.patch("/decreaselikes/:id", async (req, res) => {

    let post = await Post.findByIdAndUpdate(req.params.id, { $inc: { likescount: -1 } }, { new: true });
    res.status(200).send({ post });
});

router.delete("/:id", async (req, res) => {

    let deletedpost = await Post.deleteOne({ _id: req.params.id });
    res.status(200).send({ deletedpost });
});

module.exports = router;
