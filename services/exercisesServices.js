// const defaults = require("../config/defaults");
const UserExercises = require("../models/UserExercises");

const saveUserExercises = (data) =>
  new Promise(async (resolve, reject) => {
    const { userId, exercises } = data;

    const newInstance = new UserExercises({
      userId,
      starredExercises: exercises,
    });

    try {
      //Check existing data
      const existingRecord = await UserExercises.findOne({ userId });

      if (existingRecord) {
        existingRecord.starredExercises = exercises;

        try {
          const updatedRecord = await existingRecord.save();
          return resolve(updatedRecord);
        } catch (err) {
          return reject(err);
        }
      } else {
        try {
          const newRecord = await newInstance.save();
          return resolve(newRecord);
        } catch (err) {
          return reject(err);
        }
      }
    } catch (err) {
      reject(err);
    }
  });

const getUserExercises = (data) =>
  new Promise(async (resolve, reject) => {
    const userId = data.user_id;

    try {
      const instance = await UserExercises.findOne({ userId });

      return resolve(instance);
    } catch (err) {
      return reject(err);
    }
  });

module.exports = {
  saveUserExercises,
  getUserExercises,
};
