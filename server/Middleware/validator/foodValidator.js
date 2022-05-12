const { check, validationResult } = require("express-validator");
const createError = require("http-errors");
const path = require("path");
const { unlink } = require("fs");

// validator
const foodValidator = [
  check("itemName")
    .isLength({ min: 1 })
    .notEmpty()
    .withMessage("Name is required.")
    .trim(),
  check("categoryName").custom((categoryName, { req }) => {
    if (categoryName === "") {
      return Promise.reject("Category name is required, Chose one.");
    }
    return true;
  }),
  check("quantity").trim().isInt().withMessage("Quantity is required."),
  check("price").trim().isInt().withMessage("Price is required."),
  check("deliveryTime")
    .notEmpty()
    .withMessage("Delivery time must be in correct format yyyy:mm:dd hh:mm:ss"),
  check("image")
    .custom((image, { req }) => {
      if (image === null) {
        return Promise.reject("image is required.");
      }
      return true;
    })
    .withMessage("Image is required."),
  check("shortDescription")
    .notEmpty()
    .withMessage(`Description can not be empty.`)
    .isLength({ min: 10 })
    .withMessage(`Description will be greater than 10 words.`),
  check("longDescription")
    .notEmpty()
    .withMessage(`Description can not be empty.`)
    .isLength({ min: 10 })
    .withMessage(`Description will be greater than 10 words.`),
];

// validation handler
const foodValidationErrorHandler = (req, res, next) => {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();

  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    if (req.file) {
      const filename = req.file.filename;
      unlink(
        path.join(path.dirname(__dirname), `../public/uploads/${filename}`),
        (error) => {
          console.log(error);
        }
      );
    }

    // response errors
    res.status(500).json({
      errors: mappedErrors,
    });
  }
};

module.exports = {
  foodValidator,
  foodValidationErrorHandler,
};
