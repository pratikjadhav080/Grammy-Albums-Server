const mongoose = require("mongoose");

let doctorSchema = new mongoose.Schema({
    name: { type: String, trim:true, required: true },
    photo:{ type: String, trim:true, required: true },
    qualification:{ type: String, trim:true, required: true },
    profession:{type: String, trim:true, required: true},
    specialization:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
        required: true,
      }], 
    intro:{ type: String, trim:true, required: true },
    ratings:{type: Number, trim:true, required: true},
    slots:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "slot",
        required: true,
      }]
},
{ 
    versionKey: false,
    timestamps: true,
});


let Doctor = mongoose.model("doctor",doctorSchema);

module.exports=Doctor;