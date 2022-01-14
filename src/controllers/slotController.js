const express = require("express");
const router = express.Router();
const Slot = require("../models/slotModel");

router.post("/", async (req, res) => {

    let slot = await Slot.create(req.body);
    res.status(201).send({ slot });
});

router.get("/", async (req, res) => {

    let slot = await Slot.find().lean();
    res.status(201).send({ slot });
});

router.get("/:id", async (req, res) => {

    let slot = await Slot.findById(req.params.id).lean();
    res.status(201).send({ slot });
});

router.patch("/:id", async (req, res) => {

    let slot = await Slot.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).send({ slot });
});


router.delete("/:id", async (req, res) => {

    let deletedslot = await Slot.deleteOne({ _id: req.params.id });
    res.status(200).send({ deletedslot });
});

module.exports = router;
