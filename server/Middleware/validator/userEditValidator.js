const { check, validationResult } = require("express-validator");
const createError = require("http-errors");
const Users = require("../../Models/userModel");

const userEditValidator = [
  check("name")
    .isLength({ min: 1 })
    .withMessage("Name is required")
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("Name must not contain anything other than alphabet")
    .trim(),
  check("shopName").isLength({ min: 1 }).withMessage("Shop Name is required"),
  check("number")
    .isLength({ min: 1 })
    .withMessage("Number is required")
    .isMobilePhone("bn-BD", {
      strictMode: false,
    })
    .withMessage("Mobile number must be a valid Bangladeshi mobile number")
    .custom(async (value) => {
      try {
        const user = await Users.findOne({ number: value });
        if (user) {
          throw createError("Mobile already in used!");
        }
      } catch (err) {
        throw createError(err.message);
      }
    }),
];

const userEditValidatorErrorHandler = function (req, res, next) {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();

  if (Object.keys(mappedErrors).length === 0) {
    next();
  }

  // response the errors
  res.status(500).json({
    errors: mappedErrors,
  });
};

module.exports = {
  userEditValidator,
  userEditValidatorErrorHandler,
};
