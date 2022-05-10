const { check, validationResult } = require("express-validator");
const createError = require("http-errors");
const path = require("path");
const { unlink } = require("fs");

// update validator
const categoryEditValidators = [
  check("categoryName")
    .isLength({ min: 1 })
    .notEmpty()
    .withMessage("Category Name can't empty.")
    .trim(),
  check("image")
    .custom((image, { req }) => {
      if (image === null) {
        return Promise.reject("Please chosen updated image file.");
      }
      return true;
    })
    .withMessage("Image is required."),
  check("status").notEmpty().withMessage(`Status can't empty.`),
];

// update validation handler
const categoryEditValidationHandler = function (req, res, next) {
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
      logo: req.file,
    });
  }
};

module.exports = {
  categoryEditValidators,
  categoryEditValidationHandler,
};
