const foodRouter = require("express").Router({ caseSensitive: true });
const isAuthenticate = require("../Middleware/common/isAuthenticate");
const {
  addNewFoodPostController,
  allFoodsGetController,
  singleItemFoodGetController,
  foodUpdateController,
  singleFoodItemDeleteController,
} = require("../Controller/foodController");
const { upload } = require("../Middleware/common/singleFileUpload");
const {
  foodValidator,
  foodValidationErrorHandler,
} = require("../Middleware/validator/foodValidator");

foodRouter.post(
  "/add-new-food",
  isAuthenticate,
  upload.single("image"),
  foodValidator,
  foodValidationErrorHandler,
  addNewFoodPostController
);
foodRouter.get("/all-foods", isAuthenticate, allFoodsGetController);
foodRouter.get(
  "/single-item/:foodId",
  isAuthenticate,
  singleItemFoodGetController
);
foodRouter.put(
  "/update/single-item/:foodId",
  upload.single("image"),
  isAuthenticate,
  foodValidator,
  foodValidationErrorHandler,
  foodUpdateController
);
foodRouter.delete(
  "/delete/:foodId",
  isAuthenticate,
  singleFoodItemDeleteController
);

module.exports = foodRouter;
