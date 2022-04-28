const extraItemRouter = require("express").Router({ caseSensitive: true });
const {
  extraItemFoodAddPostController,
  allExtraFoodItemsGetController,
  singleExtraFoodItem,
  deleteSingleExtraFoodItem,
  updateExtraFoodController,
} = require("../Controller/extraItemController");
const isAuthenticate = require("../Middleware/common/isAuthenticate");
const { upload } = require("../Middleware/common/singleFileUpload");
const {
  extraItemValidator,
  extraFoodValidationErrorHandler,
} = require("../Middleware/validator/extraItemValidator");

extraItemRouter.post(
  "/add-extra-food-item",
  upload.single("image"),
  isAuthenticate
  extraItemValidator,
  extraFoodValidationErrorHandler,
  extraItemFoodAddPostController
);
extraItemRouter.get("/all-extra-food-items", isAuthenticate, allExtraFoodItemsGetController);
extraItemRouter.get("/extra-foods-single-item/:foodId", isAuthenticate, singleExtraFoodItem);
extraItemRouter.delete(
  "/extra-foods-delete-single-item/:foodId",
  isAuthenticate,
  deleteSingleExtraFoodItem
);
extraItemRouter.put(
  "/update-extra-food/:foodId",
  upload.single("image"),
  isAuthenticate,
  extraItemValidator,
  extraFoodValidationErrorHandler,
  updateExtraFoodController
);

module.exports = extraItemRouter;
