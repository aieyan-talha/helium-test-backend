const mongoose = require("mongoose");
const express = require("express");
const passport = require("passport");

const router = express.Router();

const userServices = require("../services/userServices");

router.post("/register", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  //Register new user
  try {
    const userData = await userServices.registerNewUser(req.body);
    res.json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/login", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  try {
    //Check user details and login
    const userHash = await userServices.loginUser(req.body);
    res.json(userHash);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get(
  "/current-user",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
    });
  }
);

module.exports = router;
