const express = require("express");
const router = express.Router();
const Category = require("../models/categoryModel");

router.post("/", async (req, res) => {

    let category = await Category.create(req.body);
    res.status(201).send({ category });
});

router.get("/", async (req, res) => {

    let categories = await Category.find().lean();
    res.status(201).send({ categories });
});


router.get("/:id", async (req, res) => {

    let category = await Category.findById(req.params.id).lean();
    res.status(201).send({ category });
});


router.patch("/:id", async (req, res) => {

    let category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).send({ category });
});

router.delete("/:id", async (req, res) => {

    let category = await Category.deleteOne({ _id: req.params.id });
    res.status(200).send({ category });
});

module.exports = router;
