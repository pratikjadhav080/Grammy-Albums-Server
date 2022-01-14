const mongoose = require("mongoose");

let appointmentSchema = new mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    doctorid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "doctor",
        required: true,
    },
    time: { type: String, trim: true, required: true },
    date: { type: String, trim: true, required: true },
    sessiontype:{ type: String, trim: true, required: true }
},
    {
        versionKey: false,
        timestamps: true,
    });


let Appointment = mongoose.model("appointment", appointmentSchema);

module.exports = Appointment;