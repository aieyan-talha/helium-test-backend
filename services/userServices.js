const User = require("../models/User");
const validateLoginInput = require("../validation/login");
const validateRegisterInput = require("../validation/register");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const defaults = require("../config/defaults");

const registerNewUser = (data) =>
  new Promise(async (resolve, reject) => {
    //Setting variables
    const { name, email, password, bio } = data;

    //Validate data
    const { errors, isInputValid } = validateRegisterInput(data);

    if (!isInputValid) {
      return reject(errors);
    }

    const userInstance = new User({
      name,
      email,
      password,
      bio,
    });

    try {
      //Check if user already exists otherwise create new user
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        Object.assign(errors, { email: "User already exists" });
        return reject(errors);
      } else {
        const saltRounds = defaults.saltRounds;
        bcrypt.hash(password, saltRounds, async (err, hash) => {
          if (err) {
            return reject(err);
          }
          userInstance.password = hash;

          try {
            const newUser = await userInstance.save();
            resolve(newUser);
          } catch (err) {
            reject(err);
          }
        });
      }
    } catch (err) {
      reject(err);
    }
  });

const loginUser = (data) =>
  new Promise(async (resolve, reject) => {
    const { email, password } = data;

    const { isInputValid, errors } = validateLoginInput(data);

    if (!isInputValid) {
      return reject(errors);
    }

    try {
      const userInstance = await User.findOne({ email });

      if (!userInstance) {
        Object.assign(errors, { email: "User does not exist" });
        return reject(errors);
      } else {
        //Check if passwords match
        const isMatching = await bcrypt.compare(
          password,
          userInstance.password
        );

        if (isMatching) {
          const payload = {
            id: userInstance.id,
            name: userInstance.name,
          };

          //Sign Token with JWT Token
          jwt.sign(
            payload,
            defaults.secretKey,
            { expiresIn: 3000 },
            (_, token) => {
              return resolve({ success: true, token: `Bearer ${token}` });
            }
          );
        } else {
          Object.assign(errors, { password: "Password is not correct" });
          reject(errors);
        }
      }
    } catch (err) {
      reject(err);
    }
  });

module.exports = {
  registerNewUser,
  loginUser,
};
