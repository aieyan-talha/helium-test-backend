require("dotenv").config();
const express = require("express");
const body_parser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");

const users = require("./routes/users");
const exercises = require("./routes/exercises");
const cors = require("cors");

const app = express();

//Setting up a port
const port = process.env.PORT || 4000;

//Setting up a middleware to handle JSON data
app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());

//Setup Database
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("Mongo DB Server Connected");
  })
  .catch((err) => {
    console.log("ERROR : ", err);
  });

//Initialize passport in every call
app.use(passport.initialize());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.use(cors());

//Configure passport
require("./config/passport")(passport);

//Setup User Authentication Routes
app.use("/users", users);

//Setup Exercises Data Routes
app.use("/api/exercises", exercises);

//Starting the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
