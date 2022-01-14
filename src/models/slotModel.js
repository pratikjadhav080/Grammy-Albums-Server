const mongoose = require("mongoose");

let slotSchema = new mongoose.Schema({
    slotTime: { type: String, trim:true, required: true }
},
{ 
    versionKey: false,
    timestamps: true,
});


let Slot = mongoose.model("slot",slotSchema);

module.exports = Slot;