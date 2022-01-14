const mongoose = require("mongoose");

let genreSchema = new mongoose.Schema({
    genrename : {type: String,trim: true,required: true,unique: true},
    albumids:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "album"
      }]
},
    {
        versionKey: false,
        timestamps: true,
    });


let Genre = mongoose.model("genre", genreSchema);

module.exports = Genre;