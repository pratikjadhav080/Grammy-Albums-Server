const mongoose = require("mongoose");

let postSchema = new mongoose.Schema({
    message: { type: String, trim:true, required: true },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
        required: true,
      },
    userid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
    replycount:{ type: Number, trim:true, required: true },
    likescount:{ type: Number, trim:true, required: true }
},
{ 
    versionKey: false,
    timestamps: true,
});


let Post = mongoose.model("post",postSchema);

module.exports = Post;