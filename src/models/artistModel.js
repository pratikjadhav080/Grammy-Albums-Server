const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

// step 1 :- create the schema for artist
const artistSchema = new mongoose.Schema({
    name : {type: String,trim: true,required: true},
    email: {type: String,trim: true,required: true, unique: true},
    password: {type: String,trim: true,required: true, minLength: 3, maxLength: 100},
    age: {type: Number, required: true},
    gender: {type: String,trim: true,required: true},
    photo:{type: String,trim: true,required: true},
    albumids:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "album"
      }]
}, {
    versionKey: false,
    timestamps: true
});

// create and update
//if we had used arrow function below instead of normal way of using function then 
//this wud have pointed to the window object and not the artist object

artistSchema.pre("save", function(next) {
    if(! this.isModified("password")) return next();

    const hash = bcryptjs.hashSync(this.password, 8);
    this.password = hash

    return next();
})

artistSchema.methods.checkPassword = function(password) {
    const match = bcryptjs.compareSync(password, this.password);

    return match;
}

// step 2 :- connect the schema to the artists collection
const Artist = mongoose.model("artist", artistSchema); // artists

module.exports = Artist;