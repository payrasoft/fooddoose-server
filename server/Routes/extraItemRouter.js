const extraItemRouter = require("express").Router({ caseSensitive: true });
const {
  extraItemFoodAddPostController,
  allExtraFoodItemsGetController,
  singleExtraFoodItem,
  deleteSingleExtraFoodItem,
  updateExtraFoodController,
} = require("../Controller/extraItemController");
const { upload } = require("../Middleware/common/singleFileUpload");
const {
  extraItemValidator,
  extraFoodValidationErrorHandler,
} = require("../Middleware/validator/extraItemValidator");

extraItemRouter.post(
  "/add-extra-food-item",
  upload.single("image"),
  extraItemValidator,
  extraFoodValidationErrorHandler,
  extraItemFoodAddPostController
);
extraItemRouter.get("/all-extra-food-items", allExtraFoodItemsGetController);
extraItemRouter.get("/extra-foods-single-item/:foodId", singleExtraFoodItem);
extraItemRouter.delete(
  "/extra-foods-delete-single-item/:foodId",
  deleteSingleExtraFoodItem
);
extraItemRouter.put(
  "/update-extra-food/:foodId",
  upload.single("image"),
  extraItemValidator,
  extraFoodValidationErrorHandler,
  updateExtraFoodController
);

module.exports = extraItemRouter;
