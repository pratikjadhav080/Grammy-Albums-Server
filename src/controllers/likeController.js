const express = require("express");
const router = express.Router();
const Like = require("../models/likeModel");
const axios = require("axios").default;

router.post("/", async (req, res) => {

    let like = await Like.create(req.body);

    axios
    .patch(`${process.env.BACKEND_URL}/posts/increaselikes/${req.body.postid}`, { likescount:1 })
    .then(res => {
        console.log("data", res.data)
    })
    .catch(err => {
        console.log("Error", err);
    })

    res.status(201).send({ like });
});

router.get("/", async (req, res) => {

    let like = await Like.find().lean();
    res.status(201).send({ like });
});


router.get("/:id", async (req, res) => {

    let like = await Like.findById(req.params.id).lean();
    res.status(201).send({ like });
});

router.get("/post/:postid", async (req, res) => {

    console.log(req.params.postid)
    let like = await Like.find({postid: req.params.postid}).lean();
    res.status(201).send({ like });
});

router.get("/percomment/:postid/:userid", async (req, res) => {

    console.log(req.params.postid,req.params.userid)
    let like = await Like.find({ $and: [ { postid: req.params.postid }, { userid: req.params.userid } ] }).lean();
    res.status(201).send({ like });
});

router.delete("/deletelike/:postid/:userid", async (req, res) => {

    let deletedlike = await Like.deleteOne({ $and: [ { postid: req.params.postid }, { userid: req.params.userid } ] });

    axios
    .patch(`${process.env.BACKEND_URL}/decreaselikes/${req.params.postid}`, { likescount:-1 })
    .then(res => {
        console.log("data", res.data)
    })
    .catch(err => {
        console.log("Error", err);
    })

    res.status(200).send({ deletedlike });
});

router.patch("/:id", async (req, res) => {

    let like = await Like.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).send({ like });
});

router.delete("/:id", async (req, res) => {

    let deletedlike = await Like.deleteOne({ _id: req.params.id });
    res.status(200).send({ deletedlike });
});

module.exports = router;
