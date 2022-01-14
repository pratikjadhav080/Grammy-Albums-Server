const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

// step 1 :- create the schema for user
const userSchema = new mongoose.Schema({
    name : {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, minLength: 3, maxLength: 100},
}, {
    versionKey: false,
    timestamps: true
});

// create and update
//if we had used arrow function below instead of normal way of using function then 
//this wud have pointed to the window object and not the user object

userSchema.pre("save", function(next) {
    if(! this.isModified("password")) return next();

    const hash = bcryptjs.hashSync(this.password, 8);
    this.password = hash

    return next();
})

userSchema.methods.checkPassword = function(password) {
    const match = bcryptjs.compareSync(password, this.password);

    return match;
}

// step 2 :- connect the schema to the users collection
const User = mongoose.model("user", userSchema); // users

module.exports = User;