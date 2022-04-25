const { check, validationResult } = require("express-validator");
const createError = require("http-errors");
const path = require("path");
const { unlink } = require("fs");
const User = require("../../Models/userModel");

const addUserValidators = [
    check("name")
    .isLength({ min: 1 })
    .withMessage("Name is required")
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("Name must not contain anything other than alphabet")
    .trim(),
    check("shopName").isLength({ min: 1 }).withMessage("Shop Name is required"),
    check("logo")
    .notEmpty()
    .withMessage("Please upload an image .jpg, .jpeg, .png"),
    check("email")
    .isEmail()
    .withMessage("Invalid email address")
    .trim()
    .custom(async(value) => {
        try {
            const user = await User.findOne({ email: value });
            if (user) {
                throw createError("Email already is use!");
            }
        } catch (err) {
            throw createError(err.message);
        }
    }),
    check("number")
    .isLength({ min: 1 })
    .withMessage("Number is required")
    /*   .isMobilePhone("bn-BD", {
      strictMode: true,
  })
  .withMessage("Mobile number must be a valid Bangladeshi mobile number") */
    .custom(async(value) => {
        try {
            const user = await User.findOne({ number: value });
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
        if (confirmPassword != req.body.password) {
            return Promise.reject("Password confirmation does not match password");
        }
        return true;
    }),
];

const addUserValidationHandler = function(req, res, next) {
    const errors = validationResult(req);
    const mappedErrors = errors.mapped();
    if (Object.keys(mappedErrors).length === 0) {
        next();
    } else {
        if (req.file && req.file.filename) {
            const filename = req.file.filename;
            unlink(
                path.join(path.dirname(__dirname), `../public/uploads/${filename}`),
                (err) => {
                    if (err) console.log(err);
                }
            );
        }

        // response the errors
        res.status(500).json({
            errors: mappedErrors,
            data: req.body,
        });
    }
};

module.exports = {
    addUserValidators,
    addUserValidationHandler,
};