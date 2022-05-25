const { check, validationResult } = require("express-validator");
const createError = require("http-errors");
const path = require("path");
const { unlink } = require("fs");
const SimpleUser = require("../../Models/SimpleUserModel");

// validator
const simpleUserValidator = [
  check("name").isLength({ min: 1 }).withMessage("Name is required").trim(),
  check("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Invalid email address.!")
    .trim()
    .custom(async (value) => {
      try {
        const user = await SimpleUser.findOne({ email: value });
        if (user) {
          throw createError("Email already is use!");
        }
      } catch (err) {
        throw createError(err.message);
      }
    }),
  check("phone")
    .isLength({ min: 1 })
    .withMessage("Number is required")
    .isMobilePhone("bn-BD", {
      strictMode: false,
    })
    .withMessage("Mobile number must be a valid Bangladeshi mobile number.!")
    .custom(async (value) => {
      try {
        const user = await SimpleUser.findOne({ phone: value });
        if (user) {
          throw createError("Mobile already in used!");
        }
      } catch (err) {
        throw createError(err.message);
      }
    }),
  check("password")
    .isStrongPassword()
    .withMessage(
      "Password must be at least 8 characters long & should contain at least 1 lowercase, 1 uppercase, 1 number & 1 symbol"
    ),
  check("confirmPassword")
    .isStrongPassword()
    .withMessage(
      "Password must be at least 8 characters long & should contain at least 1 lowercase, 1 uppercase, 1 number & 1 symbol"
    )
    .custom((confirmPassword, { req }) => {
      if (confirmPassword !== req.body.password) {
        return Promise.reject("Password  does not matched.!");
      }
      return true;
    }),
];

// validation handler
const simpleUserValidatorErrorHandler = (req, res, next) => {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();

  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    // response errors
    res.status(500).json({
      errors: mappedErrors,
    });
  }
};

module.exports = {
  simpleUserValidator,
  simpleUserValidatorErrorHandler,
};
