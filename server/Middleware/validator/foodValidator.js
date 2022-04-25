const { check, validationResult } = require("express-validator");
const createError = require("http-errors");
const path = require("path");
const { unlink } = require("fs");

// validator
const foodValidator = [
    check("itemName")
    .isLength({ min: 1 })
    .withMessage("Name is required.")
    .trim(),
    check("categoryName")
    .isEmpty()
    .withMessage("Category name is required.")
    .trim(),
    check("quantity").trim().isInt().withMessage("Quantity is required."),
    check("price").trim().isInt().withMessage("Price is required."),
    check("deliveryTime")
    .isEmpty()
    .withMessage("Delivery time cannot be empty.")
    .isISO8601()
    .toDate()
    .withMessage("Delivery time must be in correct format yyyy:mm:dd hh:mm:ss"),
    check("colors").isEmpty().withMessage("Please select food color."),
    check("avatar")
    .custom((value, { req }) => {
        if (
            req.files.mimetype === "image/jpg" ||
            req.files.mimetype === "image/jpeg" ||
            req.files.mimetype === "image/png"
        ) {
            return ".jpg, .jpeg, .png";
        } else {
            return false;
        }
    })
    .withMessage("Please only submit jpg, jpeg & png format."),
    check("shortDescription")
    .isEmpty()
    .withMessage(`Description can not be empty.`),
    check("longDescription")
    .isEmpty()
    .withMessage(`Description can not be empty.`),
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
                path.join(path.dirname(__dirname), `../public/uploads`),
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