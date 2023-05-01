const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserExercisesSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  starredExercises: {
    type: Array,
    default: [],
  },
});

//Create Model in DB
const UserExercises = mongoose.model("exercises", UserExercisesSchema);

module.exports = UserExercises;
