const mongoose = require("mongoose");

let categorySchema = new mongoose.Schema({
    categoryname: { type: String, trim:true, required: true }
},
{ 
    versionKey: false,
    timestamps: true,
});


let Category = mongoose.model("category",categorySchema);

module.exports = Category;