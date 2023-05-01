const express = require("express");
const passport = require("passport");

const router = express.Router();

const exerciseServices = require("../services/exercisesServices");

router.post(
  "/save-exercises",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const exerciseData = await exerciseServices.saveUserExercises(req.body);
      res.json(exerciseData);
    } catch (err) {
      res.status(400).json(err);
    }
  }
);

router.get(
  "/get-exercises/:user_id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    try {
      const exerciseData = await exerciseServices.getUserExercises(req.params);
      res.json(exerciseData);
    } catch (err) {
      res.status(400).json(err);
    }
  }
);

module.exports = router;
