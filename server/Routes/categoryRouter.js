const categoryRouter = require("express").Router({ caseSensitive: true });
const { categoryPostController } = require("../Controller/categoryController");
const { upload } = require("../Middleware/common/singleFileUpload");
const {
  categoryValidators,
  categoryValidationHandler,
} = require("../Middleware/validator/categoryValidator");

categoryRouter.post(
  "/new-category",
  upload.single("image"),
  categoryValidators,
  categoryValidationHandler,
  categoryPostController
);

module.exports = categoryRouter;
