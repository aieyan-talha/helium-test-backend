const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

const mongoose = require("mongoose");
const passport = require("passport");
const User = mongoose.model("users");

const defaults = require("./defaults");

const jwtOptions = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: defaults.secretKey,
};

module.exports = (passport) => {
  passport.use(
    new JWTStrategy(jwtOptions, async (jwt_payload, done) => {
      try {
        const user = await User.findById(jwt_payload.id);

        if (user) {
          return done(null, user);
        }
        return done(null, false);
      } catch (err) {
        console.log("ERROR : ", err);
      }
    })
  );
};
