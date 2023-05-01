const { isEmpty } = require("lodash");
const Validator = require("validator");

const validateLoginInput = (userData) => {
  const errors = {};

  if (isEmpty(userData?.email)) {
    Object.assign(errors, { email: "Email field is required" });
  }

  if (isEmpty(userData?.password)) {
    Object.assign(errors, { password: "Password field is required" });
  }

  if (userData?.email && !Validator.isEmail(userData?.email)) {
    Object.assign(errors, { email: "Invalid Email" });
  }

  return {
    errors,
    isInputValid: isEmpty(errors),
  };
};

module.exports = validateLoginInput;
