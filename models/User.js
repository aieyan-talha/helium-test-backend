//Setup user schema
const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
  },
  signupDate: {
    type: Date,
    default: Date.now,
  },
});

//Create Model in DB
const User = mongoose.model("users", UserSchema);

module.exports = User;
