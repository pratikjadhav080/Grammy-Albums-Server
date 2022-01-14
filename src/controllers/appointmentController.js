const express = require("express");
const router = express.Router();
const Appointment = require("../models/appointmentModel");
const Doctor = require("../models/doctorModel");

router.post("/", async (req, res) => {
    console.log("here")
    let appointment = await Appointment.create(req.body);
    let doctor = await Doctor.findById(req.body.doctorid).populate("specialization").lean();
    res.status(201).send({ appointment,doctor });
});

router.get("/", async (req, res) => {

    let appointment = await Appointment.find().populate(['userid', 'doctorid']).lean();
    res.status(201).send({ appointment });
});

router.get("/searchappointment/:date/:doctorid", async (req, res) => {

    console.log('here',req.params.date,req.params.doctorid)

    let doctor = await Doctor.findById(req.params.doctorid).populate("slots").lean();

    let allslots = doctor.slots.map((e)=>e.slotTime)

    let appointment = await Appointment.find({ $and: [ { date: req.params.date }, { doctorid: req.params.doctorid } ] }).lean();

    let bookedslots = appointment.map((e)=>e.time)

    let filteredslots = allslots.filter((e) => !bookedslots.includes(e));

    res.status(201).send({ bookedslots,allslots,filteredslots });
});


router.get("/:id", async (req, res) => {

    let appointment = await Appointment.findById(req.params.id).populate(['userid', 'doctorid']).lean();
    res.status(201).send({ appointment });
});

router.get("/user/:userid", async (req, res) => {

    let appointment = await Appointment.find({userid:req.params.userid}).populate(['userid', 'doctorid']).lean();

    let today = new Date().toISOString().slice(0, 10)

    console.log(today)

    let upcoming = appointment.filter((item)=>item.date>today)

    coming = upcoming.length?upcoming[0]:null

    console.log(coming)

    res.status(201).send({ coming });
});


router.patch("/:id", async (req, res) => {

    let appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).send({ appointment });
});


router.delete("/:id", async (req, res) => {

    let deletedappointment = await Appointment.deleteOne({ _id: req.params.id });
    res.status(200).send({ deletedappointment });
});

module.exports = router;
