const mongoose = require("mongoose");

let songSchema = new mongoose.Schema({
    songname : {type: String,trim: true,required: true},
    artistid : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "artist",
        required: true
      },
    albumid : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "album",
        required: true
      },
    timeofsong: { type: String,trim: true, required: true }
},{
        versionKey: false,
        timestamps: true,
});


let Song = mongoose.model("song",songSchema);

module.exports = Song;