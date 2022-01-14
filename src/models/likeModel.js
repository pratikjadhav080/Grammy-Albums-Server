const mongoose = require("mongoose");

let likeSchema = new mongoose.Schema({
    userid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
    postid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "post",
        required: true,
    }
},
{ 
    versionKey: false,
    timestamps: true,
});


let Like = mongoose.model("like",likeSchema);

module.exports = Like;