const mongoose = require("mongoose");

let replySchema = new mongoose.Schema({
    message: { type: String, trim:true, required: true },
    postid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "post",
        required: true,
      },
    likes:{ type: Number, trim:true, required: true }
},
{ 
    versionKey: false,
    timestamps: true,
});

let Reply = mongoose.model("reply",replySchema);

module.exports = Reply;