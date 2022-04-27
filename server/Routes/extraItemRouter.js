const extraItemRouter = require("express").Router({ caseSensitive: true });
const {
  extraItemFoodAddPostController,
} = require("../Controller/extraItemController");
const { upload } = require("../Middleware/common/singleFileUpload");
const {
  extraItemValidator,
  extraFoodValidationErrorHandler,
} = require("../Middleware/validator/extraItemValidator");

extraItemRouter.post(
  "/add-extra-food-item",
  upload.single("avatar"),
  extraItemValidator,
  extraFoodValidationErrorHandler,
  extraItemFoodAddPostController
);

module.exports = extraItemRouter;
