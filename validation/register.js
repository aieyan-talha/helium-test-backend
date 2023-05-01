const { isEmpty } = require("lodash");
const Validator = require("validator");

const validateRegisterInput = (userData) => {
  const errors = {};

  if (isEmpty(userData?.name)) {
    Object.assign(errors, { name: "Name field is required" });
  }

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

module.exports = validateRegisterInput;
