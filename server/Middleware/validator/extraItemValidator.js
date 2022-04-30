const { check, validationResult } = require("express-validator");
const createError = require("http-errors");
const path = require("path");
const { unlink } = require("fs");

const extraItemValidator = [
  check("itemName")
    .isLength({ min: 1 })
    .notEmpty()
    .withMessage("Name is required.")
    .trim(),
  check("image")
    .custom((image, { req }) => {
      if (image === null) {
        return Promise.reject("image is required.");
      }
      return true;
    })
    .withMessage("Image is required."),
  check("price").not().isEmpty().withMessage("Price is required."),
];

// validation handler
const extraFoodValidationErrorHandler = (req, res, next) => {
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
  extraItemValidator,
  extraFoodValidationErrorHandler,
};
