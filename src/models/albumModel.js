const mongoose = require("mongoose");

let albumSchema = new mongoose.Schema({
    albumname : {type: String,trim: true,required: true,unique: true},
    artistid : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "artist",
        required: true
      },
    genreid : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "genre",
        required: true
      },
    coverphoto : {type: String,trim: true,required: true},
    dateofrelease: { type: String,trim: true, required: true },
    songids:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "song"
      }]
},{
        versionKey: false,
        timestamps: true,
});


let Album = mongoose.model("album", albumSchema);

module.exports = Album;