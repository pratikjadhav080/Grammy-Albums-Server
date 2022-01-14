const express = require("express");
const router = express.Router();
const Doctor = require("../models/doctorModel");

router.post("/", async (req, res) => {

    let doctor = await Doctor.create(req.body);
    res.status(201).send({ doctor });
});

router.get("/", async (req, res) => {

    let doctors = await Doctor.find().populate("specialization").lean();
    res.status(201).send({ doctors });
});


router.get("/:id", async (req, res) => {

    let doctor = await Doctor.findById(req.params.id).populate("specialization").lean();
    res.status(201).send({ doctor });
});

router.get("/category/:id", async (req, res) => {

    console.log(req.params.id)
    let doctor = await Doctor.find({ specialization: req.params.id }).populate("specialization").lean();
    res.status(201).send({ doctor });
});


router.patch("/:id", async (req, res) => {

    let doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).send({ doctor });
});


router.delete("/:id", async (req, res) => {

    let deletedDoctor = await Doctor.deleteOne({ _id: req.params.id });
    res.status(200).send({ deletedDoctor });
});

module.exports = router;
